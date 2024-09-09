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
  useLazyGetAgentDropdownQuery,
  useLazyGetCategoriesDropdownQuery,
  usePatchBulkUpdateTicketsMutation,
  usePostAddReplyToBulkUpdateMutation,
} from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
} from '@/redux/slices/airServices/tickets/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useGetTicketList } from '../TicketsServicesHooks/useGetTicketList';

export const useTicketBulkUpdate = () => {
  const dispatch = useAppDispatch();
  const { getTicketsListData } = useGetTicketList();

  const selectedTicketLists = useAppSelector(
    (state) => state?.servicesTickets?.selectedTicketLists,
  );
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTickets?.isPortalOpen,
  );
  const [isReplyAdded, setIsReplyAdded] = useState(false);

  const theme: any = useTheme();
  const [patchBulkUpdateTicketsTrigger, patchBulkUpdateTicketsStatus] =
    usePatchBulkUpdateTicketsMutation();

  const methodsBulkUpdateForm: any = useForm({
    resolver: yupResolver(
      ticketsBulkUpdateFormValidationSchemaFunction?.(isReplyAdded),
    ),
    defaultValues: ticketsBulkUpdateDefaultFormValues,
  });

  const { handleSubmit, reset } = methodsBulkUpdateForm;
  const [postAddReplyToBulkUpdateTrigger, postAddReplyToBulkUpdateStatus] =
    usePostAddReplyToBulkUpdateMutation();

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
      successSnackbar('Your reply has been sent!');
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
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
      successSnackbar('Ticket Updated Successfully');
      if (!!data?.to?.length && !!data?.description) {
        submitReply?.(data);
      }
      onClose();
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

  const apiQueryAgent = useLazyGetAgentDropdownQuery();
  const apiQueryCategories = useLazyGetCategoriesDropdownQuery();
  const ticketsBulkUpdateFormFields = ticketsBulkUpdateFormFieldsDynamic?.(
    apiQueryAgent,
    apiQueryCategories,
  );

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
    patchBulkUpdateTicketsStatus,
    postAddReplyToBulkUpdateStatus,
    isPortalOpen,
  };
};
