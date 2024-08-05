import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import usePath from '@/hooks/usePath';
import {
  useLazyGetAgentDropdownQuery,
  useLazyGetCategoriesDropdownQuery,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetRequesterDropdownQuery,
} from '@/services/airServices/tickets';
import {
  ticketsFilterFormFieldsDataFunction,
  ticketsFilterFormFieldsDefaultValues,
} from './FilterTickets.data';
import { PAGINATION } from '@/config';
import { filteredEmptyValues } from '@/utils/api';
import { TicketActionComponentPropsI } from '../TicketsLists/TicketsLists.interface';

export const useFilterTickets = (props: TicketActionComponentPropsI) => {
  const { setIsDrawerOpen, setFilterTicketLists, filterTicketLists, setPage } =
    props;
  const router = useRouter();

  const { makePath } = usePath();

  const methods: any = useForm({
    defaultValues: ticketsFilterFormFieldsDefaultValues(filterTicketLists),
  });

  const { handleSubmit, reset } = methods;

  const submitTicketFilterForm = async (data: any) => {
    const ticketsFiltered: any = filteredEmptyValues?.(data);

    if (!Object?.keys(ticketsFiltered || {})?.length) {
      setFilterTicketLists(ticketsFiltered);
      onClose();
      return;
    }
    setPage(PAGINATION?.CURRENT_PAGE);
    setFilterTicketLists(ticketsFiltered);
    onClose();
  };

  const resetTicketFilterForm = async () => {
    if (!!Object?.keys(filterTicketLists)?.length) {
      setFilterTicketLists({});
    }
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

  const apiQueryRequester = useLazyGetRequesterDropdownQuery();
  const apiQueryAgent = useLazyGetAgentDropdownQuery();
  const apiQueryCategories = useLazyGetCategoriesDropdownQuery();
  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();

  const ticketsFilterFormFieldsData = ticketsFilterFormFieldsDataFunction(
    apiQueryRequester,
    apiQueryAgent,
    apiQueryCategories,
    apiQueryDepartment,
  );

  return {
    ticketsFilterFormFieldsData,
    methods,
    handleSubmit,
    submitTicketFilterForm,
    onClose,
    resetTicketFilterForm,
  };
};
