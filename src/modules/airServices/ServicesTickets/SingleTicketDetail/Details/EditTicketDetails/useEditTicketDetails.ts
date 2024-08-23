import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';

import {
  useGetTicketsDetailsByIdQuery,
  useEditTicketsDetailsMutation,
  useLazyGetAgentDropdownForEditTicketDetailsQuery,
  useLazyGetCategoriesDropdownForEditTicketDetailsQuery,
  useLazyGetServiceCatalogCategoriesDropdownForEditTicketDetailsQuery,
} from '@/services/airServices/tickets/single-ticket-details/details';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { ARRAY_INDEX, TICKET_TYPE } from '@/constants/strings';
import {
  editTicketDetailsDefaultValuesDynamic,
  editTicketDetailsFormFieldsDynamic,
  editTicketDetailsValidationSchema,
} from './EditTicketDetails.data';
import { useLazyGetDepartmentDropdownQuery } from '@/services/airServices/tickets';
import {
  useLazyGetDynamicFieldsQuery,
  usePostDynamicFormAttachmentsMutation,
} from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicAttachmentsPost,
} from '@/utils/dynamic-forms';
import { AIR_SERVICES } from '@/constants';

export const useEditTicketDetails = () => {
  const router = useRouter();
  const [form, setForm] = useState<any>([]);

  const { ticketId } = router?.query;
  const [editTicketsDetailsTrigger, editTicketsDetailsStatus] =
    useEditTicketsDetailsMutation();

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

  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetTicketsDetailsByIdQuery(getSingleTicketParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    });

  const methods: any = useForm<any>({
    resolver: yupResolver(editTicketDetailsValidationSchema?.(form)),
    defaultValues: editTicketDetailsDefaultValuesDynamic(),
  });

  const { handleSubmit, reset, getValues, control, setValue } = methods;

  const watchForTicketType = useWatch({
    control,
    name: 'ticketType',
    defaultValue: null,
  });

  const watchForCategory = useWatch({
    control,
    name: 'category',
    defaultValue: null,
  });

  useEffect(() => {
    if (getValues('ticketType')?._id === TICKET_TYPE?.SR) {
      setValue('service', null);
    }
  }, [watchForCategory]);

  useEffect(() => {
    reset(() =>
      editTicketDetailsDefaultValuesDynamic(
        data?.data?.[ARRAY_INDEX?.ZERO],
        form,
      ),
    );
  }, [data, reset, form]);

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
      const ticketDetailsData = new FormData();
      ticketDetailsData?.append(
        'requester',
        data?.data?.[ARRAY_INDEX?.ZERO]?.requester,
      );
      ticketDetailsData.append('status', newFormData?.status?._id);
      ticketDetailsData.append('pirority', newFormData?.priority?._id);
      !!newFormData?.department?._id &&
        ticketDetailsData?.append('department', newFormData?.department?._id);
      !!newFormData?.source &&
        ticketDetailsData.append('source', newFormData?.source?._id);
      ticketDetailsData.append('ticketType', newFormData?.ticketType?._id);
      !!newFormData?.impact &&
        ticketDetailsData.append('impact', newFormData?.impact?._id);
      newFormData?.ticketType?._id === TICKET_TYPE?.SR &&
        ticketDetailsData.append('serviceId', newFormData?.service?._id);
      newFormData?.ticketType?._id === TICKET_TYPE?.SR &&
        ticketDetailsData.append('subject', newFormData?.service?.itemName);
      ticketDetailsData.append(
        'description',
        newFormData?.ticketType?._id === TICKET_TYPE?.SR
          ? newFormData?.service?.description
          : data?.data?.[ARRAY_INDEX?.ZERO]?.description,
      );
      !!newFormData?.agent &&
        ticketDetailsData.append('agent', newFormData?.agent?._id);
      !!newFormData?.category &&
        ticketDetailsData.append('category', newFormData?.category?._id);
      ticketDetailsData?.append(
        'moduleType',
        data?.data?.[ARRAY_INDEX?.ZERO]?.moduleType,
      );

      !!newFormData?.plannedEndDate &&
        ticketDetailsData?.append(
          'plannedEndDate',
          newFormData?.plannedEndDate?.toISOString(),
        );
      !!newFormData?.plannedEffort &&
        ticketDetailsData.append('plannedEffort', newFormData?.plannedEffort);
      ticketDetailsData?.append(
        'isChildTicket',
        data?.data?.[ARRAY_INDEX?.ZERO]?.isChildTicket,
      );
      ticketDetailsData?.append('id', ticketId as string);

      if (body?.customFields) {
        ticketDetailsData?.append(
          'customFields',
          JSON?.stringify(body?.customFields),
        );
      }

      const editTicketsDetailsParameter = {
        body: ticketDetailsData,
      };

      await editTicketsDetailsTrigger(editTicketsDetailsParameter)?.unwrap();
      successSnackbar('Ticket updated successfully');
      router?.push(AIR_SERVICES?.TICKETS);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const apiQueryAgent = useLazyGetAgentDropdownForEditTicketDetailsQuery();
  const apiQueryCategory =
    useLazyGetCategoriesDropdownForEditTicketDetailsQuery();
  const apiQueryServicesCategory =
    useLazyGetServiceCatalogCategoriesDropdownForEditTicketDetailsQuery?.();
  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();

  const ticketDetailsFormFields = editTicketDetailsFormFieldsDynamic(
    apiQueryAgent,
    apiQueryCategory,
    apiQueryDepartment,
    watchForTicketType,
    apiQueryServicesCategory,
    getValues,
  );

  return {
    methods,
    handleSubmit,
    onSubmit,
    ticketDetailsFormFields,
    isLoading,
    isFetching,
    editTicketsDetailsStatus,
    form,
    getDynamicFieldsStatus,
    postAttachmentStatus,
    isError,
    getDynamicFormData,
    refetch,
  };
};
