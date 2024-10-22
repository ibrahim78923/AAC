import { useTheme } from '@mui/material';
import {
  ticketsBulkUpdateDefaultFormValues,
  ticketsBulkUpdateFormValidationSchemaFunction,
  ticketsBulkUpdateAddReplyFormFieldsData,
  ticketsBulkUpdateFormFieldsDynamic,
  isReplyAddedNeglect,
} from './TicketsBulkUpdate.data';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airServices/tickets/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useGetTicketList } from '../TicketsServicesHooks/useGetTicketList';
import { PAGINATION } from '@/config';
import {
  useSendReplyToServicesTicketsBulkUpdateMutation,
  useUpdateBulkServicesTicketsMutation,
} from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useTicketBulkUpdate = () => {
  const dispatch = useAppDispatch();
  const { getTicketsListData, page } = useGetTicketList();
  const totalRecords = useAppSelector(
    (state) => state?.servicesTickets?.totalRecords,
  );
  const selectedTicketLists = useAppSelector(
    (state) => state?.servicesTickets?.selectedTicketLists,
  );
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTickets?.isPortalOpen,
  );
  const [isReplyAdded, setIsReplyAdded] = useState(false);

  const theme: any = useTheme();
  const [patchBulkUpdateTicketsTrigger, patchBulkUpdateTicketsStatus] =
    useUpdateBulkServicesTicketsMutation();

  const methodsBulkUpdateForm: any = useForm({
    resolver: yupResolver(
      ticketsBulkUpdateFormValidationSchemaFunction?.(isReplyAdded),
    ),
    defaultValues: ticketsBulkUpdateDefaultFormValues,
  });

  const { handleSubmit, reset } = methodsBulkUpdateForm;
  const [postAddReplyToBulkUpdateTrigger, postAddReplyToBulkUpdateStatus] =
    useSendReplyToServicesTicketsBulkUpdateMutation();

  const submitReply = async (formData: { [key: string]: any }) => {
    const emailFormData = new FormData();
    emailFormData?.append('recipients', formData?.to);
    emailFormData?.append('html', formData?.description);
    emailFormData?.append('subject', 'bulk updated');
    formData?.file !== null &&
      emailFormData?.append('attachments', formData?.file);

    const apiDataParameter = {
      body: emailFormData,
    };

    try {
      await postAddReplyToBulkUpdateTrigger(apiDataParameter)?.unwrap();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const refetchApi = async () => {
    const newPage =
      selectedTicketLists?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage?.(newPage));
    await getTicketsListData?.(newPage);
  };

  const submitTicketBulkUpdateForm = async (data: any) => {
    const body: any = Object?.entries(data || {})
      ?.filter(
        ([key, value]: any) =>
          value !== undefined &&
          value != '' &&
          value != null &&
          !isReplyAddedNeglect?.includes(key),
      )
      ?.reduce(
        (acc: any, [key, value]: any) => ({ ...acc, [key]: value?._id }),
        {},
      );
    const bulkUpdateTicketParams = new URLSearchParams();
    selectedTicketLists?.forEach(
      (ticketId: any) => bulkUpdateTicketParams?.append('ids', ticketId?._id),
    );
    const bulkUpdateTicketsParameter = {
      queryParams: bulkUpdateTicketParams,
      body,
    };

    try {
      await patchBulkUpdateTicketsTrigger(bulkUpdateTicketsParameter)?.unwrap();
      if (!!data?.to?.length && !!data?.description) {
        await submitReply?.(data);
      }
      successSnackbar('Ticket updated successfully');
      onClose();
      await refetchApi();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const onClose = () => {
    reset?.();
    dispatch(emptySelectedTicketLists());
    dispatch(setIsPortalClose());
  };

  const ticketsBulkUpdateFormFields = ticketsBulkUpdateFormFieldsDynamic?.();

  const apiCallInProgress =
    patchBulkUpdateTicketsStatus?.isLoading ||
    postAddReplyToBulkUpdateStatus?.isLoading;

  return {
    ticketsBulkUpdateFormFields,
    theme,
    ticketsBulkUpdateAddReplyFormFieldsData,
    methodsBulkUpdateForm,
    handleSubmit,
    isReplyAdded,
    setIsReplyAdded,
    onClose,
    submitTicketBulkUpdateForm,
    isPortalOpen,
    apiCallInProgress,
  };
};
