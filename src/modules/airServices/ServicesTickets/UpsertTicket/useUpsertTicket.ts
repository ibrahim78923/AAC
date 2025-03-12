import {
  upsertTicketDefaultValuesFunction,
  upsertTicketFormFieldsDynamic,
  upsertTicketValidationSchema,
} from './UpsertTicket.data';
import { useEffect } from 'react';
import { filteredEmptyValues } from '@/utils/api';
import { ARRAY_INDEX, MODULE_TYPE } from '@/constants/strings';
import { DYNAMIC_FIELDS } from '@/utils/dynamic-forms';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useGetTicketList } from '../TicketsServicesHooks/useGetTicketList';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
} from '@/redux/slices/airServices/tickets/slice';
import { TICKETS_ACTION_CONSTANTS } from '../TicketsLists/TicketsListHeader/TicketListHeader.data';
import {
  useAddSingleServicesTicketMutation,
  useGetServicesSingleTicketDetailByIdQuery,
  useUpdateSingleServicesTicketByIdMutation,
} from '@/services/airServices/tickets';
import { REGEX } from '@/constants/validation';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { isoDateString } from '@/lib/date-time';
import {
  servicesTicketsIsPortalOpenSelector,
  servicesTicketsSelectedTicketListsSelector,
} from '@/redux/slices/airServices/tickets/selectors';
import { useFormLib } from '@/hooks/useFormLib';
import { useDynamicForm } from '@/components/DynamicForm/useDynamicForm';
import { TICKET_TYPE } from '@/constants/services';

export const useUpsertTicket = () => {
  const dispatch = useAppDispatch();
  const { getTicketsListData } = useGetTicketList();
  const selectedTicketLists = useAppSelector(
    servicesTicketsSelectedTicketListsSelector,
  );

  const isPortalOpen = useAppSelector(servicesTicketsIsPortalOpenSelector);

  const ticketId =
    isPortalOpen?.action === TICKETS_ACTION_CONSTANTS?.EDIT_TICKET
      ? selectedTicketLists?.[ARRAY_INDEX?.ZERO]?._id
      : '';

  const [postTicketTrigger, postTicketStatus] =
    useAddSingleServicesTicketMutation();
  const [putTicketTrigger, putTicketStatus] =
    useUpdateSingleServicesTicketByIdMutation();

  const dynamicFormProps = {
    productType: DYNAMIC_FIELDS?.PT_SERVICES,
    moduleType: DYNAMIC_FIELDS?.MT_TICKETS,
  };

  const {
    form,
    handleUploadAttachments,
    isDynamicFormLoading,
    hasDynamicFormError,
    attachmentsApiCallInProgress,
    getDynamicFormData,
  } = useDynamicForm(dynamicFormProps);

  useEffect(() => {
    getDynamicFormData();
  }, []);

  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };
  const { data, isLoading, isFetching, isError, refetch, isUninitialized } =
    useGetServicesSingleTicketDetailByIdQuery(getSingleTicketParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    });

  const formLibProps = {
    validationSchema: upsertTicketValidationSchema?.(ticketId, form),
    defaultValues: upsertTicketDefaultValuesFunction?.(),
  };

  const { handleSubmit, reset, getValues, setError, setValue, watch, methods } =
    useFormLib(formLibProps);

  const ticketDetailsData = data?.data?.[ARRAY_INDEX?.ZERO];

  useEffect(() => {
    reset(() => upsertTicketDefaultValuesFunction(ticketDetailsData, form));
  }, [data, reset, form]);

  const submitUpsertTicket = async (formData: any) => {
    const newFormData = filteredEmptyValues(formData);

    const { plannedEffort } = getValues();
    if (
      plannedEffort?.trim() !== '' &&
      !REGEX?.HOURS_AND_MINUTES?.test(plannedEffort)
    ) {
      setError('plannedEffort', {
        message:
          'Invalid format for Planned Effort. Please use format like 1h10m',
      });
      return;
    }

    try {
      const { body }: any = await handleUploadAttachments?.(
        formData,
        newFormData,
      );

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
          isoDateString(newFormData?.plannedEndDate),
        );
      !!newFormData?.plannedStartDate &&
        upsertTicketFormData?.append(
          'plannedStartDate',
          isoDateString(newFormData?.plannedStartDate),
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
        ticketDetailsData?.moduleType ?? MODULE_TYPE?.TICKETS,
      );
      upsertTicketFormData?.append(
        'ticketType',
        ticketDetailsData?.ticketType ?? TICKET_TYPE?.INC,
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
      successSnackbar('Ticket added successfully');
      onClose?.();
      await getTicketsListData();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitUpdateTicket = async (formData: any) => {
    formData?.append('isChildTicket', ticketDetailsData?.isChildTicket);
    formData?.append('id', ticketId);

    const putTicketParameter = {
      body: formData,
    };

    try {
      await putTicketTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Ticket updated successfully');
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

  const upsertTicketFormFields = upsertTicketFormFieldsDynamic(
    ticketId,
    getValues,
    setValue,
    watch,
  );

  const apiCallInProgress =
    putTicketStatus?.isLoading ||
    postTicketStatus?.isLoading ||
    attachmentsApiCallInProgress;

  const showLoader = isLoading || isFetching || isDynamicFormLoading;

  const hasError = isError || hasDynamicFormError;

  const refreshApi = () => {
    if (!isUninitialized) {
      refetch?.();
    }
    getDynamicFormData?.();
  };

  return {
    handleSubmit,
    submitUpsertTicket,
    methods,
    onClose,
    ticketId,
    upsertTicketFormFields,
    isError,
    form,
    isPortalOpen,
    apiCallInProgress,
    showLoader,
    hasError,
    refreshApi,
  };
};
