import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  ticketsBulkUpdateDefaultFormValues,
  ticketsBulkUpdateFormFieldsData,
  ticketsBulkUpdateFormValidationSchemaFunction,
  ticketsBulkUpdateAddReplyFormFieldsData,
} from './TicketsBulkUpdate.data';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import usePath from '@/hooks/usePath';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useTicketBulkUpdate = (props: any) => {
  const { setIsDrawerOpen } = props;
  const [isReplyAdded, setIsReplyAdded] = useState(false);

  const router = useRouter();
  const theme: any = useTheme();
  const { makePath } = usePath();

  const methodsBulkUpdateForm: any = useForm({
    resolver: yupResolver(
      ticketsBulkUpdateFormValidationSchemaFunction?.(isReplyAdded),
    ),
    defaultValues: ticketsBulkUpdateDefaultFormValues,
  });

  const { handleSubmit, reset } = methodsBulkUpdateForm;

  const submitTicketBulkUpdateForm = async () => {
    enqueueSnackbar('Ticket Updated Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset();
    setIsDrawerOpen?.(false);
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
  return {
    ticketsBulkUpdateFormFieldsData,
    router,
    theme,
    ticketsBulkUpdateAddReplyFormFieldsData,
    methodsBulkUpdateForm,
    handleSubmit,
    submitTicketBulkUpdateForm,
    isReplyAdded,
    setIsReplyAdded,
    onClose,
  };
};
