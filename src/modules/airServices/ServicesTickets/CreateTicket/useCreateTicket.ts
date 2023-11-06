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

  const submitCreateNewTicket = async () => {
    enqueueSnackbar('Ticket Added Successfully', {
      variant: 'success',
    });
    reset(createTicketDefaultValues);
    setIsDrawerOpen(false);
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
    router,
    theme,
    handleSubmit,
    submitCreateNewTicket,
    methods,
    onClose,
  };
};
