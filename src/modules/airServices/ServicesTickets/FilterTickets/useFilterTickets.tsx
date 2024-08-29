import { useForm, UseFormReturn } from 'react-hook-form';
import {
  useLazyGetAgentDropdownQuery,
  useLazyGetAirServicesAllUsersAsRequestersDropdownListQuery,
  useLazyGetCategoriesDropdownQuery,
  useLazyGetDepartmentDropdownQuery,
} from '@/services/airServices/tickets';
import {
  ticketsFilterFormFieldsDataFunction,
  ticketsFilterFormFieldsDefaultValues,
} from './FilterTickets.data';
import { PAGINATION } from '@/config';
import { filteredEmptyValues } from '@/utils/api';
import { TicketActionComponentPropsI } from '../TicketsLists/TicketsLists.interface';
import { TicketsFilterFormFieldsI } from './FilterTickets.interface';

export const useFilterTickets = (props: TicketActionComponentPropsI) => {
  const { setIsPortalOpen, setFilterTicketLists, filterTicketLists, setPage } =
    props;

  const methods: UseFormReturn<TicketsFilterFormFieldsI> =
    useForm<TicketsFilterFormFieldsI>({
      defaultValues: ticketsFilterFormFieldsDefaultValues(filterTicketLists),
    });

  const { handleSubmit, reset } = methods;

  const submitTicketFilterForm = async (data: TicketsFilterFormFieldsI) => {
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

  const apiQueryAgent = useLazyGetAgentDropdownQuery();
  const apiQueryCategories = useLazyGetCategoriesDropdownQuery();
  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  const apiQueryRequester =
    useLazyGetAirServicesAllUsersAsRequestersDropdownListQuery();

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
