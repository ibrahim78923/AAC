import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createTicketDefaultValues,
  createTicketValidationSchema,
} from './CreateTicket.data';
import { enqueueSnackbar } from 'notistack';

export const useCreateTicket = (props: any) => {
  const router = useRouter();
  const theme: any = useTheme();
  const { setIsDrawerOpen } = props;

  const methods: any = useForm({
    resolver: yupResolver(createTicketValidationSchema),
    defaultValues: createTicketDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const submitCreateNewTicket = async (data: any) => {
    enqueueSnackbar('Ticket Added Successfully', {
      variant: 'success',
    });
    reset(createTicketDefaultValues);
    setIsDrawerOpen(false);
    console.log(data);
  };
  return {
    router,
    theme,
    handleSubmit,
    submitCreateNewTicket,
    methods,
  };
};
