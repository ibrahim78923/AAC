import { Theme, useTheme } from '@mui/material';
import { NextRouter, useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  upsertTicketDefaultValuesFunction,
  upsertTicketFormFieldsDynamic,
  upsertTicketValidationSchema,
} from './UpsertRelatedTicket.data';
import { useEffect, useMemo } from 'react';
import { useGetTicketsByIdQuery } from '@/services/airServices/tickets';
import {
  useAddChildTicketsMutation,
  usePutChildTicketsMutation,
} from '@/services/airServices/tickets/single-ticket-details/related-tickets';
import { errorSnackbar, makeDateTime, successSnackbar } from '@/utils/api';
import { ARRAY_INDEX, MODULE_TYPE, TICKET_TYPE } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { getActiveAccountSession } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { RELATED_TICKET_ACTIONS_CONSTANT } from '../Header/Header.data';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
} from '@/redux/slices/airServices/related-tickets/slice';

export const useUpsertRelatedTicket = () => {
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

  const auth: any = useAuth();
  const product = useMemo(() => getActiveAccountSession(), []);
  const companyId = product?.company?._id ?? {};
  const userId = auth?.user?._id ?? {};
  const organizationId = auth?.user?.organization?._id ?? {};

  const router: NextRouter = useRouter();
  const { ticketId } = router?.query;
  const theme: Theme = useTheme();
  const [postChildTicketTrigger, postChildTicketStatus] =
    useAddChildTicketsMutation();
  const [putChildTicketTrigger, putChildTicketStatus] =
    usePutChildTicketsMutation();

  const getSingleTicketParameter = {
    pathParam: {
      ticketId: childTicketId,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetTicketsByIdQuery(getSingleTicketParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!childTicketId,
    });

  const methods: any = useForm<any>({
    resolver: yupResolver(upsertTicketValidationSchema),
    defaultValues: upsertTicketDefaultValuesFunction(),
  });

  const { handleSubmit, reset, getValues } = methods;

  const submitUpsertTicket = async (data: any) => {
    const { plannedEffort } = getValues();
    if (plannedEffort?.trim() !== '' && !/^\d+h\d+m$/?.test(plannedEffort)) {
      errorSnackbar(
        'Invalid format for Planned Effort. Please use format like 1h10m',
      );
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
        makeDateTime(data?.plannedEndDate, new Date())?.toISOString(),
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
    !!!childTicketId && upsertTicketFormData?.append('userId', userId);
    !!!childTicketId && upsertTicketFormData?.append('companyId', companyId);
    !!!childTicketId &&
      upsertTicketFormData?.append('organization', organizationId);

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

  const upsertTicketFormFields = upsertTicketFormFieldsDynamic();

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
