import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  upsertTicketDefaultValuesFunction,
  upsertTicketFormFieldsDynamic,
  upsertTicketValidationSchema,
} from './UpsertTicket.data';

import { useEffect, useState } from 'react';
import {
  useGetTicketsByIdQuery,
  useLazyGetAirServicesAllAgentsUsersDropdownListQuery,
  useLazyGetAirServicesAllUsersAsRequestersDropdownListQuery,
  useLazyGetAssociateAssetsDropdownForTicketsQuery,
  useLazyGetCategoriesDropdownForTicketsQuery,
  useLazyGetDepartmentDropdownForTicketsQuery,
  usePostTicketsMutation,
  usePutTicketsMutation,
} from '@/services/airServices/tickets';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { ARRAY_INDEX, MODULE_TYPE, TICKET_TYPE } from '@/constants/strings';
import {
  useLazyGetDynamicFieldsQuery,
  usePostDynamicFormAttachmentsMutation,
} from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicAttachmentsPost,
} from '@/utils/dynamic-forms';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useGetTicketList } from '../TicketsServicesHooks/useGetTicketList';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
} from '@/redux/slices/airServices/tickets/slice';
import { TICKETS_ACTION_CONSTANTS } from '../TicketsLists/TicketsLists.data';

export const useUpsertTicket = () => {
  const dispatch = useAppDispatch();
  const { getTicketsListData } = useGetTicketList();
  const selectedTicketLists = useAppSelector(
    (state) => state?.servicesTickets?.selectedTicketLists,
  );

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTickets?.isPortalOpen,
  );

  const ticketId =
    isPortalOpen?.action === TICKETS_ACTION_CONSTANTS?.EDIT_TICKET
      ? selectedTicketLists?.[ARRAY_INDEX?.ZERO]?._id
      : '';

  const router = useRouter();
  const theme: any = useTheme();

  const [form, setForm] = useState<any>([]);

  const [postTicketTrigger, postTicketStatus] = usePostTicketsMutation();
  const [putTicketTrigger, putTicketStatus] = usePutTicketsMutation();

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
  const { data, isLoading, isFetching, isError } = useGetTicketsByIdQuery(
    getSingleTicketParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    },
  );

  const methods: any = useForm<any>({
    resolver: yupResolver(upsertTicketValidationSchema?.(ticketId, form)),
    defaultValues: upsertTicketDefaultValuesFunction(),
  });

  const { handleSubmit, reset, getValues } = methods;

  useEffect(() => {
    reset(() =>
      upsertTicketDefaultValuesFunction(data?.data?.[ARRAY_INDEX?.ZERO], form),
    );
  }, [data, reset, form]);

  const submitUpsertTicket = async (formData: any) => {
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

      const upsertTicketFormData = new FormData();
      upsertTicketFormData?.append('requester', newFormData?.requester?._id);
      upsertTicketFormData?.append('subject', newFormData?.subject);
      !!newFormData?.description &&
        upsertTicketFormData?.append('description', newFormData?.description);
      !!newFormData?.category?._id &&
        upsertTicketFormData?.append('category', newFormData?.category?._id);
      !!newFormData?.status?._id &&
        upsertTicketFormData?.append('status', newFormData?.status?._id);
      !!newFormData?.priority?._id &&
        upsertTicketFormData?.append('pirority', newFormData?.priority?._id);
      !!newFormData?.department?._id &&
        upsertTicketFormData?.append(
          'department',
          newFormData?.department?._id,
        );
      !!newFormData?.source &&
        upsertTicketFormData?.append('source', newFormData?.source?._id);
      !!newFormData?.impact &&
        upsertTicketFormData?.append('impact', newFormData?.impact?._id);
      !!newFormData?.agent &&
        upsertTicketFormData?.append('agent', newFormData?.agent?._id);
      !!newFormData?.plannedEndDate &&
        upsertTicketFormData?.append(
          'plannedEndDate',
          newFormData?.plannedEndDate?.toISOString(),
        );
      !!newFormData?.plannedEffort &&
        upsertTicketFormData?.append(
          'plannedEffort',
          newFormData?.plannedEffort,
        );
      !!newFormData?.attachFile &&
        upsertTicketFormData?.append('fileUrl', newFormData?.attachFile);
      !!newFormData?.associatesAssets?.length &&
        upsertTicketFormData?.append(
          'associateAssets',
          newFormData?.associatesAssets?.map((asset: any) => asset?._id),
        );
      upsertTicketFormData?.append(
        'moduleType',
        data?.data?.[ARRAY_INDEX?.ZERO]?.moduleType ?? MODULE_TYPE?.TICKETS,
      );
      upsertTicketFormData?.append(
        'ticketType',
        data?.data?.[ARRAY_INDEX?.ZERO]?.ticketType ?? TICKET_TYPE?.INC,
      );

      if (body?.customFields) {
        upsertTicketFormData?.append(
          'customFields',
          JSON?.stringify(body?.customFields),
        );
      }

      if (!!ticketId) {
        submitUpdateTicket(upsertTicketFormData);
        return;
      }

      const postTicketParameter = {
        body: upsertTicketFormData,
      };

      await postTicketTrigger(postTicketParameter)?.unwrap();
      successSnackbar('Ticket Added Successfully');
      onClose?.();
      await getTicketsListData();
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const submitUpdateTicket = async (formData: any) => {
    formData?.append(
      'isChildTicket',
      data?.data?.[ARRAY_INDEX?.ZERO]?.isChildTicket,
    );
    formData?.append('id', ticketId);

    const putTicketParameter = {
      body: formData,
    };

    try {
      await putTicketTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Ticket Updated Successfully');
      onClose?.();
      await getTicketsListData();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const onClose = () => {
    reset?.();
    dispatch(emptySelectedTicketLists());
    dispatch(setIsPortalClose());
  };

  const apiQueryDepartment = useLazyGetDepartmentDropdownForTicketsQuery();
  const apiQueryRequester =
    useLazyGetAirServicesAllUsersAsRequestersDropdownListQuery();
  const apiQueryAgent = useLazyGetAirServicesAllAgentsUsersDropdownListQuery();
  const apiQueryAssociateAsset =
    useLazyGetAssociateAssetsDropdownForTicketsQuery();
  const apiQueryCategories = useLazyGetCategoriesDropdownForTicketsQuery();

  const upsertTicketFormFields = upsertTicketFormFieldsDynamic(
    apiQueryRequester,
    apiQueryDepartment,
    apiQueryAgent,
    apiQueryCategories,
    apiQueryAssociateAsset,
    router,
    ticketId,
  );

  return {
    router,
    theme,
    handleSubmit,
    submitUpsertTicket,
    methods,
    onClose,
    putTicketStatus,
    postTicketStatus,
    isLoading,
    isFetching,
    ticketId,
    upsertTicketFormFields,
    isError,
    form,
    getDynamicFieldsStatus,
    postAttachmentStatus,
    isPortalOpen,
  };
};
