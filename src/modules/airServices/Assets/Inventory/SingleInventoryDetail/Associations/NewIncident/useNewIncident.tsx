import {
  newIncidentValidationSchema,
  newIncidentsDefaultValuesFunction,
} from './NewIncident.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { filteredEmptyValues } from '@/utils/api';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { MODULE_TYPE, TICKET_TYPE } from '@/constants/strings';
import { useRouter } from 'next/router';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';
import {
  usePostAirServicesRemoveAssociateTicketsMutation,
  usePostServicesInventoryAssociationTicketsMutation,
} from '@/services/airServices/tickets/single-ticket-details/association';
import { useEffect, useState } from 'react';
import {
  useLazyGetDynamicFieldsQuery,
  usePostDynamicFormAttachmentsMutation,
} from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicAttachmentsPost,
} from '@/utils/dynamic-forms';
import { isoDateString } from '@/lib/date-time';

export const useNewIncident = (props: {
  openDrawer: boolean;
  setIsOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setIsOpenDrawer } = props;

  const [form, setForm] = useState<any[]>([]);

  const router = useRouter();
  const { inventoryId } = router?.query;

  const [postTicketTrigger, postTicketStatus] =
    usePostServicesInventoryAssociationTicketsMutation();

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();
  const [postAttachmentTrigger, postAttachmentStatus] =
    usePostDynamicFormAttachmentsMutation();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SERVICES,
      moduleType: DYNAMIC_FIELDS?.MT_TICKETS,
    };
    const getDynamicFieldsParameters = { params };

    try {
      const res: any = await getDynamicFieldsTrigger(
        getDynamicFieldsParameters,
      )?.unwrap();
      setForm(res);
    } catch (error: any) {
      setForm([]);
    }
  };

  useEffect(() => {
    getDynamicFormData();
  }, []);

  const methods: any = useForm<any>({
    resolver: yupResolver(newIncidentValidationSchema?.(form)),
    defaultValues: newIncidentsDefaultValuesFunction?.(form),
  });

  const { handleSubmit, reset, getValues } = methods;

  const onSubmit = async (formData: any) => {
    const newFormData = filteredEmptyValues(formData);

    const { plannedEffort } = getValues();
    if (plannedEffort?.trim() !== '' && !/^\d+h\d+m$/?.test(plannedEffort)) {
      errorSnackbar(
        'Invalid format for Planned Effort. Please use format like 1h10m',
      );
      return;
    }

    const customFields: any = {};
    const body: any = {};
    const attachmentPromises: Promise<any>[] = [];

    try {
      dynamicAttachmentsPost({
        form,
        data: formData,
        attachmentPromises,
        customFields,
        postAttachmentTrigger,
      });

      await Promise?.all(attachmentPromises);

      const customFieldKeys = new Set(
        form?.map((field: any) => field?.componentProps?.label),
      );

      Object?.entries(newFormData)?.forEach(([key, value]) => {
        if (customFieldKeys?.has(key)) {
          if (value instanceof Date) {
            value = isoDateString(value);
          }
          if (
            typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
            !Array?.isArray(value) &&
            value !== null
          ) {
            customFields[key] = { ...customFields[key], ...value };
          } else {
            customFields[key] = value;
          }
        } else {
          body[key] = value;
        }
      });

      if (Object?.keys(customFields)?.length > 0) {
        body.customFields = customFields;
      }

      const newIncidentTicketFormData = new FormData();
      newIncidentTicketFormData?.append(
        'requester',
        newFormData?.requester?._id,
      );
      newIncidentTicketFormData?.append('subject', newFormData?.subject);
      newIncidentTicketFormData?.append(
        'description',
        newFormData?.description,
      );
      !!newFormData?.category?._id &&
        newIncidentTicketFormData?.append(
          'category',
          newFormData?.category?._id,
        );
      newIncidentTicketFormData?.append('status', newFormData?.status?._id);
      newIncidentTicketFormData?.append('pirority', newFormData?.priority?._id);
      !!newFormData?.department?._id &&
        newIncidentTicketFormData?.append(
          'department',
          newFormData?.department?._id,
        );
      !!newFormData?.source &&
        newIncidentTicketFormData?.append('source', newFormData?.source?._id);
      !!newFormData?.impact &&
        newIncidentTicketFormData?.append('impact', newFormData?.impact?._id);
      !!newFormData?.agent &&
        newIncidentTicketFormData?.append('agent', newFormData?.agent?._id);
      !!newFormData?.plannedEndDate &&
        newIncidentTicketFormData?.append(
          'plannedEndDate',
          isoDateString(newFormData?.plannedEndDate),
        );
      !!newFormData?.plannedEffort &&
        newIncidentTicketFormData?.append(
          'plannedEffort',
          newFormData?.plannedEffort,
        );
      !!newFormData?.associatesAssets?.length &&
        newIncidentTicketFormData?.append(
          'associateAssets',
          newFormData?.associatesAssets?.map((asset: any) => asset?._id),
        );
      !!newFormData?.attachFile &&
        newIncidentTicketFormData?.append('fileUrl', newFormData?.attachFile);
      newIncidentTicketFormData?.append('moduleType', MODULE_TYPE?.TICKETS);
      newIncidentTicketFormData?.append('ticketType', TICKET_TYPE?.INC);

      if (body?.customFields) {
        newIncidentTicketFormData?.append(
          'customFields',
          JSON?.stringify(body?.customFields),
        );
      }

      const postTicketParameter = {
        body: newIncidentTicketFormData,
      };

      const response: any =
        await postTicketTrigger(postTicketParameter)?.unwrap();
      await associateIncident?.(response?.data?._id);
      successSnackbar('Ticket Associated Successfully');
      reset();
      onClose();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const [postRemoveAssociateTicketsTrigger, postRemoveAssociateTicketsStatus] =
    usePostAirServicesRemoveAssociateTicketsMutation();

  const associateIncident = async (ticketId: string) => {
    const body = {
      recordId: inventoryId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.ASSETS,
      operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
      ticketsIds: [ticketId],
    };
    const postRemoveAssociateTicketsParameter = {
      body,
    };

    try {
      await postRemoveAssociateTicketsTrigger(
        postRemoveAssociateTicketsParameter,
      )?.unwrap();
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const onClose = () => {
    setIsOpenDrawer?.(false);
    reset?.();
  };

  return {
    handleSubmit,
    onSubmit,
    methods,
    onClose,
    postTicketStatus,
    associateIncident,
    postRemoveAssociateTicketsStatus,
    form,
    getDynamicFieldsStatus,
    postAttachmentStatus,
  };
};
