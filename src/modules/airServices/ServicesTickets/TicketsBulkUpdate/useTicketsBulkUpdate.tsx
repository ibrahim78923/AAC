import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  ticketsBulkUpdateDefaultFormValues,
  ticketsBulkUpdateFormValidationSchemaFunction,
  ticketsBulkUpdateAddReplyFormFieldsData,
  ticketsBulkUpdateFormFieldsDynamic,
} from './TicketsBulkUpdate.data';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import usePath from '@/hooks/usePath';
import {
  useLazyGetAgentDropdownQuery,
  useLazyGetCategoriesDropdownQuery,
  usePatchBulkUpdateTicketsMutation,
} from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useTicketBulkUpdate = (props: any) => {
  const { setIsDrawerOpen, setSelectedTicketList, selectedTicketList } = props;
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

  const submitTicketBulkUpdateForm = async (data: any) => {
    const body: any = Object?.entries(data || {})
      ?.filter(
        ([, value]: any) => value !== undefined && value != '' && value != null,
      )
      ?.reduce(
        (acc: any, [key, value]: any) => ({ ...acc, [key]: value?._id }),
        {},
      );
    const bulkUpdateTicketParams = new URLSearchParams();
    selectedTicketList?.forEach(
      (ticketId: any) => bulkUpdateTicketParams?.append('Ids', ticketId),
    );
    const bulkUpdateTicketsParameter = {
      queryParams: bulkUpdateTicketParams,
      body,
    };

    try {
      await patchBulkUpdateTicketsTrigger(bulkUpdateTicketsParameter)?.unwrap();
      successSnackbar('Ticket Updated Successfully');
      reset();
      setIsDrawerOpen?.(false);
      setSelectedTicketList?.([]);
    } catch (error) {
      errorSnackbar();
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
  };
};
