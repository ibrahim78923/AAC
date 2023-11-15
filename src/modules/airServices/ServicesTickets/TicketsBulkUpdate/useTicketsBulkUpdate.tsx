import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  ticketsBulkUpdateDefaultFormValuesFunction,
  ticketsBulkUpdateFormFieldsDataFunction,
  ticketsBulkUpdateFormValidationSchemaFunction,
  ticketsBulkUpdateToFormFieldsDataFunction,
} from './TicketsBulkUpdate.data';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import usePath from '@/hooks/usePath';

export const useTicketBulkUpdate = (props: any) => {
  const router = useRouter();
  const theme: any = useTheme();
  const { makePath } = usePath();
  const [isReplyAdded, setIsReplyAdded] = useState(false);
  const { setIsDrawerOpen } = props;
  const ticketsBulkUpdateFormFieldsData =
    ticketsBulkUpdateFormFieldsDataFunction();
  const ticketsBulkUpdateToFormFieldsData =
    ticketsBulkUpdateToFormFieldsDataFunction();

  const methodsBulkUpdateForm: any = useForm({
    resolver: yupResolver(
      ticketsBulkUpdateFormValidationSchemaFunction?.(isReplyAdded),
    ),
    defaultValues: ticketsBulkUpdateDefaultFormValuesFunction?.(),
  });

  const { handleSubmit, reset } = methodsBulkUpdateForm;

  useEffect(() => {
    reset(() => ticketsBulkUpdateDefaultFormValuesFunction());
  }, [isReplyAdded, reset]);

  const submitTicketBulkUpdateForm = async () => {
    enqueueSnackbar('Ticket Updated Successfully', {
      variant: 'success',
    });
    reset(ticketsBulkUpdateDefaultFormValuesFunction?.());
    setIsDrawerOpen?.(false);
  };

  const onClose = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['tableAction'],
      }),
    );
    // const { tableAction, ...restQueries } = router?.query;
    // router?.push({
    //   pathname: router?.pathname,
    //   query: {
    //     ...restQueries,
    //   },
    // });
    reset?.();
    setIsDrawerOpen(false);
  };
  return {
    ticketsBulkUpdateFormFieldsData,
    router,
    theme,
    ticketsBulkUpdateToFormFieldsData,
    methodsBulkUpdateForm,
    handleSubmit,
    submitTicketBulkUpdateForm,
    isReplyAdded,
    setIsReplyAdded,
    onClose,
  };
};
