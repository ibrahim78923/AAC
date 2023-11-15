import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  upsertTicketDefaultValuesFunction,
  upsertTicketValidationSchema,
} from './UpsertTicket.data';
import { enqueueSnackbar } from 'notistack';
import {
  useGetTicketsByIdQuery,
  usePostTicketsMutation,
  usePutTicketsMutation,
} from '@/services/airServices/tickets';
import { useEffect } from 'react';

export const useUpsertTicket = (props: any) => {
  const { setIsDrawerOpen, ticketId } = props;

  const router = useRouter();
  const theme: any = useTheme();

  const [postTicketTrigger, postTicketStatus] = usePostTicketsMutation();
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
    resolver: yupResolver(upsertTicketValidationSchema),
    defaultValues: upsertTicketDefaultValuesFunction(),
    reValidateMode: 'onBlur',
  });

  const { handleSubmit, reset } = methods;

  const submitUpsertTicket = async (data: any) => {
    const upsertTicketFormData = new FormData();
    Object?.entries?.(data || {})?.forEach(
      ([key, value]: any) => upsertTicketFormData?.append(key, value),
    );
    if (!!ticketId) {
      submitUpdateTicket(upsertTicketFormData);
      return;
    }
    const postTicketParameter = {
      body: data,
    };
    try {
      const response = await postTicketTrigger(postTicketParameter)?.unwrap();
      enqueueSnackbar(response?.message ?? 'Ticket Added Successfully', {
        variant: 'success',
      });
      reset();
      setIsDrawerOpen?.(false);
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
      setIsDrawerOpen?.(false);
    } catch (error) {
      enqueueSnackbar('There is something wrong', {
        variant: 'error',
      });
    }
  };
  useEffect(() => {
    reset(() => upsertTicketDefaultValuesFunction(data?.data));
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
    setIsDrawerOpen?.(false);
  };
  return {
    router,
    theme,
    handleSubmit,
    submitUpsertTicket,
    methods,
    onClose,
    postTicketStatus,
    isLoading,
    isFetching,
    putTicketStatus,
    ticketId,
  };
};
