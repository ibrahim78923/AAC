import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
// import { enqueueSnackbar } from 'notistack';
import {
  ticketsBulkUpdateDefaultFormValuesFunction,
  ticketsBulkUpdateFormFieldsDataFunction,
  ticketsBulkUpdateToFormFieldsDataFunction,
} from './TicketsBulkUpdate.data';
import { useEffect } from 'react';
// import { useEffect } from 'react';

export const useTicketBulkUpdate = (props: any) => {
  const router = useRouter();
  const theme: any = useTheme();
  const { to, reset } = props;

  const ticketsBulkUpdateFormFieldsData =
    ticketsBulkUpdateFormFieldsDataFunction(router?.query?.action === 'view');
  const ticketsBulkUpdateToFormFieldsData =
    ticketsBulkUpdateToFormFieldsDataFunction(router?.query?.action === 'view');

  useEffect(() => {
    reset(() => ticketsBulkUpdateDefaultFormValuesFunction(to));
  }, [to, reset]);

  return {
    ticketsBulkUpdateFormFieldsData,
    router,
    theme,
    ticketsBulkUpdateToFormFieldsData,
  };
};
