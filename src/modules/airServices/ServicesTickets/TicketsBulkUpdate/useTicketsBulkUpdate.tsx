import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  ticketsBulkUpdateDefaultFormValuesFunction,
  ticketsBulkUpdateFormFieldsDataFunction,
  ticketsBulkUpdateFormSchemaFunction,
  ticketsBulkUpdateToFormFieldsDataFunction,
} from './TicketsBulkUpdate.data';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';

export const useTicketBulkUpdate = (props: any) => {
  const router = useRouter();
  const theme: any = useTheme();
  const [to, setTo] = useState(false);
  const { setIsDrawerOpen } = props;
  const ticketsBulkUpdateFormFieldsData =
    ticketsBulkUpdateFormFieldsDataFunction(router?.query?.action === 'view');
  const ticketsBulkUpdateToFormFieldsData =
    ticketsBulkUpdateToFormFieldsDataFunction(router?.query?.action === 'view');

  const methodsBulkUpdateForm: any = useForm({
    resolver: yupResolver(ticketsBulkUpdateFormSchemaFunction?.(to)),
    defaultValues: ticketsBulkUpdateDefaultFormValuesFunction?.(),
  });

  const { handleSubmit, reset } = methodsBulkUpdateForm;

  useEffect(() => {
    reset(() => ticketsBulkUpdateDefaultFormValuesFunction());
  }, [to, reset]);
  const submitTicketBulkUpdateForm = async () => {
    // console.log(data);
    enqueueSnackbar('Ticket Updated Successfully', {
      variant: 'success',
    });
    reset(ticketsBulkUpdateDefaultFormValuesFunction?.());
    setIsDrawerOpen(false);
  };

  const onClose = () => {
    const { tableAction, ...restQueries } = router?.query;
    router.push({
      pathname: router?.pathname,
      query: {
        ...restQueries,
      },
    });
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
    to,
    setTo,
    onClose,
  };
};
