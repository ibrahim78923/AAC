import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  ticketsFilterDefaultFormValuesFunction,
  ticketsFilterFormFieldsDataFunction,
  ticketsFilterFormSchema,
} from './TicketsFilter.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';

export const useTicketsFilter = (props: any) => {
  const { setIsDrawerOpen } = props;
  const router = useRouter();
  const theme: any = useTheme();
  const ticketsFilterFormFieldsData = ticketsFilterFormFieldsDataFunction();

  const methods: any = useForm({
    resolver: yupResolver(ticketsFilterFormSchema),
    defaultValues: ticketsFilterDefaultFormValuesFunction(),
  });
  const { handleSubmit, reset } = methods;
  //TODO: will use in BE integration
  //   useEffect(() => {
  //     reset(() => ticketsFilterDefaultFormValuesFunction(data?.data));
  //   }, [data, reset]);

  const submitTicketFilterForm = async () => {
    enqueueSnackbar(`Ticket Filtered Successfully`, {
      variant: 'success',
    });
    reset(ticketsFilterDefaultFormValuesFunction?.());
    setIsDrawerOpen?.(false);
  };

  const resetTicketFilterForm = async () => {
    reset();
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
    setIsDrawerOpen?.(false);
  };
  return {
    ticketsFilterFormFieldsData,
    router,
    theme,
    methods,
    handleSubmit,
    submitTicketFilterForm,
    resetTicketFilterForm,
    onClose,
  };
};
