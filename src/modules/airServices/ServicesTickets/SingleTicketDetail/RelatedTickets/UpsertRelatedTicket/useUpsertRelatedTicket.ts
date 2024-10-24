import { Theme, useTheme } from '@mui/material';
import { NextRouter, useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  upsertTicketDefaultValuesFunction,
  upsertTicketFormFieldsDynamic,
  upsertTicketValidationSchema,
} from './UpsertRelatedTicket.data';
import { useEffect } from 'react';
import { ARRAY_INDEX, MODULE_TYPE, TICKET_TYPE } from '@/constants/strings';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { RELATED_TICKET_ACTIONS_CONSTANT } from '../Header/Header.data';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
} from '@/redux/slices/airServices/related-tickets/slice';
import { useGetRelatedTicketList } from '../../../TicketsServicesHooks/useGetRelatedTicketList';
import {
  useAddSingleServicesRelatedTicketsMutation,
  useUpdateSingleServicesRelatedTicketByIdMutation,
} from '@/services/airServices/tickets/single-ticket-details/related-tickets';
import { useGetServicesSingleTicketDetailByIdQuery } from '@/services/airServices/tickets';
import { isoDateString } from '@/lib/date-time';
import { REGEX } from '@/constants/validation';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useUpsertRelatedTicket = () => {
  const { getChildTicketsListData } = useGetRelatedTicketList();

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesRelatedTickets?.isPortalOpen,
  );
  const selectedRelatedTicketLists = useAppSelector(
    (state) => state?.servicesRelatedTickets?.selectedRelatedTicketLists,
  );
  const dispatch = useAppDispatch();
  const childTicketId =
    isPortalOpen?.action ===
    RELATED_TICKET_ACTIONS_CONSTANT?.EDIT_RELATED_TICKET
      ? selectedRelatedTicketLists?.[ARRAY_INDEX?.ZERO]
      : '';

  const router: NextRouter = useRouter();
  const { ticketId } = router?.query;
  const theme: Theme = useTheme();
  const [postChildTicketTrigger, postChildTicketStatus] =
    useAddSingleServicesRelatedTicketsMutation();
  const [putChildTicketTrigger, putChildTicketStatus] =
    useUpdateSingleServicesRelatedTicketByIdMutation();

  const getSingleTicketParameter = {
    pathParam: {
      ticketId: childTicketId,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetServicesSingleTicketDetailByIdQuery(getSingleTicketParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!childTicketId,
    });

  const methods: any = useForm<any>({
    resolver: yupResolver(upsertTicketValidationSchema?.(childTicketId)),
    defaultValues: upsertTicketDefaultValuesFunction(),
  });

  const { handleSubmit, reset, getValues, setError } = methods;

  const submitUpsertTicket = async (data: any) => {
    const { plannedEffort } = getValues();
    if (
      plannedEffort?.trim() !== '' &&
      !REGEX?.HOURS_AND_MINUTES?.test(plannedEffort)
    ) {
      setError('plannedEffort', {
        message:
          'Invalid format for planned effort. Please use format like 1h10m',
      });
      return;
    }

    const upsertTicketFormData = new FormData();
    upsertTicketFormData?.append('requester', data?.requester?._id);
    upsertTicketFormData?.append('subject', data?.subject);
    !!data?.description &&
      upsertTicketFormData?.append('description', data?.description);
    !!data?.category?._id &&
      upsertTicketFormData?.append('category', data?.category?._id);
    upsertTicketFormData?.append('status', data?.status?._id);
    upsertTicketFormData?.append('pirority', data?.priority?._id);
    !!data?.department?._id &&
      upsertTicketFormData?.append('department', data?.department?._id);
    !!data?.source && upsertTicketFormData?.append('source', data?.source?._id);
    !!data?.impact && upsertTicketFormData?.append('impact', data?.impact?._id);
    !!data?.agent && upsertTicketFormData?.append('agent', data?.agent?._id);
    !!data?.plannedEndDate &&
      upsertTicketFormData?.append(
        'plannedEndDate',
        isoDateString(data?.plannedEndDate),
      );
    !!data?.plannedEffort &&
      upsertTicketFormData?.append('plannedEffort', data?.plannedEffort);
    data?.attachFile !== null &&
      typeof data?.attachFile !== 'string' &&
      upsertTicketFormData?.append('fileUrl', data?.attachFile);
    !!data?.associatesAssets?.length &&
      upsertTicketFormData?.append(
        'associateAssets',
        data?.associatesAssets?.map((asset: any) => asset?._id),
      );
    upsertTicketFormData?.append('moduleType', MODULE_TYPE?.TICKETS);
    upsertTicketFormData?.append('ticketType', TICKET_TYPE?.INC);

    if (!!childTicketId) {
      submitUpdateTicket(upsertTicketFormData);
      return;
    }
    const postTicketParameter = {
      body: upsertTicketFormData,
      queryParams: {
        id: ticketId,
      },
    };

    try {
      await postChildTicketTrigger(postTicketParameter)?.unwrap();
      successSnackbar('Child ticket added successfully');
      onClose?.();
      await getChildTicketsListData?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitUpdateTicket = async (data: any) => {
    data?.append('isChildTicket', true);
    data?.append('id', childTicketId);

    const putTicketParameter = {
      body: data,
    };

    try {
      await putChildTicketTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Child ticket updated successfully');
      onClose?.();
      await getChildTicketsListData?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  useEffect(() => {
    reset(() => upsertTicketDefaultValuesFunction(data?.data?.[0]));
  }, [data, reset]);

  const onClose = () => {
    reset?.();
    dispatch(emptySelectedTicketLists());
    dispatch(setIsPortalClose());
  };

  const upsertTicketFormFields = upsertTicketFormFieldsDynamic(childTicketId);

  return {
    router,
    theme,
    handleSubmit,
    submitUpsertTicket,
    methods,
    onClose,
    postChildTicketStatus,
    putChildTicketStatus,
    isLoading,
    isFetching,
    ticketId,
    upsertTicketFormFields,
    isError,
    childTicketId,
    refetch,
    isPortalOpen,
  };
};
