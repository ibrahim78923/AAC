import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  ticketsFilterFormFieldsDataFunction,
  ticketsFilterFormFieldsDefaultValues,
} from './TicketsFilter.data';
import { useForm } from 'react-hook-form';
import usePath from '@/hooks/usePath';
import {
  useLazyGetAgentDropdownQuery,
  useLazyGetCategoriesDropdownQuery,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetRequesterDropdownQuery,
} from '@/services/airServices/tickets';

export const useTicketsFilter = (props: any) => {
  const { setIsDrawerOpen, setFilterTicketLists, filterTicketLists } = props;
  const router = useRouter();
  const theme: any = useTheme();
  const { makePath } = usePath();

  const methods: any = useForm({
    defaultValues: ticketsFilterFormFieldsDefaultValues(filterTicketLists),
  });

  const { handleSubmit, reset } = methods;

  const submitTicketFilterForm = async (data: any) => {
    onClose();
    return;
    const ticketsFiltered: any = Object?.entries(data || {})
      ?.filter(
        ([, value]: any) => value !== undefined && value != '' && value != null,
      )
      ?.reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {});
    if (!Object?.keys(ticketsFiltered || {})?.length) {
      onClose();
      return;
    }
    setFilterTicketLists(ticketsFiltered);
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

  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  const apiQueryRequester = useLazyGetRequesterDropdownQuery();
  const apiQueryAgent = useLazyGetAgentDropdownQuery();
  const apiQueryCategories = useLazyGetCategoriesDropdownQuery();

  const ticketsFilterFormFieldsData = ticketsFilterFormFieldsDataFunction(
    apiQueryRequester,
    apiQueryDepartment,
    apiQueryAgent,
    apiQueryCategories,
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
