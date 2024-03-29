import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
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
import usePath from '@/hooks/usePath';
import {
  useLazyGetAgentDropdownQuery,
  useLazyGetCategoriesDropdownQuery,
  usePatchBulkUpdateTicketsMutation,
  usePostAddReplyToBulkUpdateMutation,
} from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { EMAIL_SENT_TYPE } from '@/constants/strings';

export const useTicketBulkUpdate = (props: any) => {
  const {
    setIsDrawerOpen,
    setSelectedTicketList,
    selectedTicketList,
    setFilterTicketLists,
    getTicketsListData,
    setPage,
  } = props;
  const [isReplyAdded, setIsReplyAdded] = useState(false);

  const router = useRouter();
  const theme: any = useTheme();
  const { makePath } = usePath();
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

  const submitReply = async (formData: any) => {
    const emailFormData = new FormData();
    emailFormData?.append('recipients', formData?.to);
    emailFormData?.append('html', formData?.description);
    emailFormData?.append('subject', 'bulk updated');
    emailFormData?.append('type', EMAIL_SENT_TYPE?.REPLY);
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
    selectedTicketList?.forEach(
      (ticketId: any) => bulkUpdateTicketParams?.append('ids', ticketId),
    );
    const bulkUpdateTicketsParameter = {
      queryParams: bulkUpdateTicketParams,
      body,
    };

    try {
      await patchBulkUpdateTicketsTrigger(bulkUpdateTicketsParameter)?.unwrap();
      successSnackbar('Ticket Updated Successfully');
      setIsDrawerOpen?.(false);
      getTicketsListData(1, {});
      setFilterTicketLists?.({});
      setPage?.(1);
      if (!!data?.to && !!data?.description) {
        submitReply?.(data);
      }
      reset();
      setSelectedTicketList?.([]);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const onClose = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['ticketAction'],
      }),
    );
    reset?.();
    setIsDrawerOpen(false);
  };
  const apiQueryAgent = useLazyGetAgentDropdownQuery();
  const apiQueryCategories = useLazyGetCategoriesDropdownQuery();
  const ticketsBulkUpdateFormFields = ticketsBulkUpdateFormFieldsDynamic?.(
    apiQueryAgent,
    apiQueryCategories,
  );

  return {
    ticketsBulkUpdateFormFields,
    router,
    theme,
    ticketsBulkUpdateAddReplyFormFieldsData,
    methodsBulkUpdateForm,
    handleSubmit,
    submitTicketBulkUpdateForm,
    isReplyAdded,
    setIsReplyAdded,
    onClose,
    patchBulkUpdateTicketsStatus,
    postAddReplyToBulkUpdateStatus,
  };
};
