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

export const useTicketBulkUpdate = (props: any) => {
  const router = useRouter();
  const theme: any = useTheme();
  const [to, setTo] = useState(false);
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
  const submitTicketBulkUpdateForm = async (data: any) => {
    console.log(data);
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
  };
};
