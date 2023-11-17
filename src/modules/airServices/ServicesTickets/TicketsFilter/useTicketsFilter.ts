import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { ticketsFilterFormFieldsDataFunction } from './TicketsFilter.data';
import { useForm } from 'react-hook-form';
import usePath from '@/hooks/usePath';
import { useLazyGetOrganizationsQuery } from '@/services/dropdowns';

export const useTicketsFilter = (props: any) => {
  const { setIsDrawerOpen, setTicketsFilter } = props;
  const router = useRouter();
  const theme: any = useTheme();
  const { makePath } = usePath();

  const methods: any = useForm({});

  const { handleSubmit, reset } = methods;

  const submitTicketFilterForm = async (data: any) => {
    const ticketsFiltered = Object?.entries(data || {})?.filter(
      ([, value]: any) => value !== undefined && value != '',
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
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['ticketAction'],
      }),
    );
    reset?.();
    setIsDrawerOpen?.(false);
  };
  const apiQueryOrganizations = useLazyGetOrganizationsQuery();
  const ticketsFilterFormFieldsData = ticketsFilterFormFieldsDataFunction(
    apiQueryOrganizations,
    apiQueryOrganizations,
    apiQueryOrganizations,
    apiQueryOrganizations,
  );

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
