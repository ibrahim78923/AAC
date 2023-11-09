import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createTicketDefaultValues,
  createTicketValidationSchema,
} from './CreateTicket.data';
import { enqueueSnackbar } from 'notistack';
import { usePostTicketsMutation } from '@/services/airServices/tickets';

export const useCreateTicket = (props: any) => {
  const router = useRouter();
  const theme: any = useTheme();
  const { ticketId } = router?.query;
  const [postTicketTrigger, postTicketStatus] = usePostTicketsMutation();
  const { setIsDrawerOpen } = props;

  const methods: any = useForm({
    resolver: yupResolver(createTicketValidationSchema),
    defaultValues: createTicketDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const submitCreateNewTicket = async (data: any) => {
    const upsertTicketFormData = new FormData();
    Object?.entries?.(data || {})?.forEach(([k, v]: any) =>
      upsertTicketFormData.append(k, v),
    );
    if (!!ticketId) {
      submitUpdateTicket(upsertTicketFormData);
      return;
    }
    // upsertTicketFormData.append('attachFile', data?.attachFile);
    // upsertTicketFormData.forEach((x: any) => console.log(x));
    try {
      const response = await postTicketTrigger({}).unwrap();
      // console.log(response);
      enqueueSnackbar(response?.message ?? 'Ticket Added Successfully', {
        variant: 'success',
      });
      reset(createTicketDefaultValues);
      setIsDrawerOpen(false);
    } catch (error) {
      enqueueSnackbar('There is something wrong', {
        variant: 'error',
      });
    }
  };

  const submitUpdateTicket = async ({}: any) => {
    // console.log(data);
    // upsertTicketFormData.append('attachFile', data?.attachFile);
    // upsertTicketFormData.forEach((x: any) => console.log(x));
    try {
      const response = await postTicketTrigger({}).unwrap();
      // console.log(response);
      enqueueSnackbar(response?.message ?? 'Ticket Added Successfully', {
        variant: 'success',
      });
      reset(createTicketDefaultValues);
      setIsDrawerOpen(false);
    } catch (error) {
      enqueueSnackbar('There is something wrong', {
        variant: 'error',
      });
    }
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
    postTicketStatus,
  };
};
