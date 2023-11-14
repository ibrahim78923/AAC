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
  const { setIsDrawerOpen } = props;

  const router = useRouter();
  const theme: any = useTheme();

  const [to, setTo] = useState(false);

  const ticketsBulkUpdateFormFieldsData =
    ticketsBulkUpdateFormFieldsDataFunction();
  const ticketsBulkUpdateToFormFieldsData =
    ticketsBulkUpdateToFormFieldsDataFunction();

  const methodsBulkUpdateForm: any = useForm({
    resolver: yupResolver(ticketsBulkUpdateFormSchemaFunction?.(to)),
    defaultValues: ticketsBulkUpdateDefaultFormValuesFunction?.(),
  });

  const { handleSubmit, reset } = methodsBulkUpdateForm;

  useEffect(() => {
    reset(() => ticketsBulkUpdateDefaultFormValuesFunction());
  }, [to, reset]);

  const submitTicketBulkUpdateForm = async () => {
    enqueueSnackbar('Ticket Updated Successfully', {
      variant: 'success',
    });

    reset(ticketsBulkUpdateDefaultFormValuesFunction?.());
    setIsDrawerOpen?.(false);
  };

  const onClose = () => {
    //TODO: destructing as i do not need that in rest queries.
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { tableAction, ...restQueries } = router?.query;
    router?.push({
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
