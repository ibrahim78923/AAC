import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createTicketDefaultValuesFunction,
  createTicketValidationSchema,
} from './CreateTicket.data';
import { enqueueSnackbar } from 'notistack';
import {
  useGetTicketsByIdQuery,
  usePostTicketsMutation,
  usePutTicketsMutation,
} from '@/services/airServices/tickets';
import { useEffect } from 'react';

export const useCreateTicket = (props: any) => {
  const router = useRouter();
  const theme: any = useTheme();
  const [postTicketTrigger, postTicketStatus] = usePostTicketsMutation();
  const { setIsDrawerOpen, ticketId } = props;
  const [putTicketTrigger, putTicketStatus] = usePutTicketsMutation();

  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };

  const { data, isLoading, isFetching } = useGetTicketsByIdQuery(
    getSingleTicketParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    },
  );
  const methods: any = useForm<any>({
    resolver: yupResolver(createTicketValidationSchema),
    defaultValues: createTicketDefaultValuesFunction(),
    reValidateMode: 'onBlur',
  });

  const { handleSubmit, reset } = methods;

  const submitCreateNewTicket = async (data: any) => {
    const upsertTicketFormData = new FormData();
    Object?.entries?.(data || {})?.forEach(
      ([k, v]: any) => upsertTicketFormData?.append(k, v),
    );
    if (!!ticketId) {
      submitUpdateTicket(upsertTicketFormData);
      return;
    }
    const postTicketParameter = {
      body: data,
    };
    try {
      const response = await postTicketTrigger(postTicketParameter).unwrap();
      enqueueSnackbar(response?.message ?? 'Ticket Added Successfully', {
        variant: 'success',
      });
      reset();
      setIsDrawerOpen(false);
    } catch (error) {
      enqueueSnackbar('There is something wrong', {
        variant: 'error',
      });
    }
  };

  const submitUpdateTicket = async (data: any) => {
    const putTicketParameter = {
      body: data,
      pathParam: {
        id: ticketId,
      },
    };
    try {
      const response = await putTicketTrigger(putTicketParameter)?.unwrap();
      enqueueSnackbar(response?.message ?? 'Ticket Added Successfully', {
        variant: 'success',
      });
      reset();
      setIsDrawerOpen(false);
    } catch (error) {
      enqueueSnackbar('There is something wrong', {
        variant: 'error',
      });
    }
  };
  useEffect(() => {
    reset(() => createTicketDefaultValuesFunction(data?.data));
  }, [data, reset]);

  const onClose = () => {
    //TODO: destructing as i do not need that in rest queries.
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { ticketAction, ...restQueries } = router?.query;
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
    isLoading,
    isFetching,
    putTicketStatus,
  };
};
