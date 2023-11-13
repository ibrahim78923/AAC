import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { ticketsFilterFormFieldsDataFunction } from './TicketsFilter.data';
import { useForm } from 'react-hook-form';

export const useTicketsFilter = (props: any) => {
  const { setIsDrawerOpen, setTicketsFilter } = props;
  const router = useRouter();
  const theme: any = useTheme();
  const ticketsFilterFormFieldsData = ticketsFilterFormFieldsDataFunction();

  const methods: any = useForm({});
  const { handleSubmit, reset } = methods;

  const submitTicketFilterForm = async (data: any) => {
    const ticketsFiltered = Object.entries(data).filter(
      ([, v]: any) => v !== undefined && v != '',
    );
    if (!!!ticketsFiltered?.length) {
      onClose();
      return;
    }
    setTicketsFilter(ticketsFiltered);
    onClose();
  };

  const resetTicketFilterForm = async () => {
    reset();
    setIsDrawerOpen?.(false);
  };
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
