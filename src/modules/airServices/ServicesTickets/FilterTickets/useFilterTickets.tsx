import { useForm } from 'react-hook-form';
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
  const { setIsPortalOpen, setFilterTicketLists, filterTicketLists, setPage } =
    props;

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
    setIsPortalOpen?.({});
  };

  const onClose = () => {
    reset?.();
    setIsPortalOpen?.({});
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
