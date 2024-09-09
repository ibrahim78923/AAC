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
import { filteredEmptyValues } from '@/utils/api';
import { TicketsFilterFormFieldsI } from './FilterTickets.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptyFilterTicketLists,
  setFilterTicketLists,
  setIsPortalClose,
} from '@/redux/slices/airServices/tickets/slice';
import { PAGINATION } from '@/config';

export const useFilterTickets = () => {
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTickets?.isPortalOpen,
  );
  const filterTicketLists = useAppSelector(
    (state) => state?.servicesTickets?.filterTicketLists,
  );
  const dispatch = useAppDispatch();
  const methods: UseFormReturn<TicketsFilterFormFieldsI> =
    useForm<TicketsFilterFormFieldsI>({
      defaultValues: ticketsFilterFormFieldsDefaultValues(filterTicketLists),
    });

  const { handleSubmit, reset } = methods;

  const submitTicketFilterForm = async (data: TicketsFilterFormFieldsI) => {
    const ticketsFiltered: any = filteredEmptyValues?.(data);

    if (!Object?.keys(ticketsFiltered || {})?.length) {
      dispatch(
        setFilterTicketLists<any>({
          filterValues: ticketsFiltered,
          page: PAGINATION?.CURRENT_PAGE,
        }),
      );
      onClose();
      return;
    }
    dispatch(
      setFilterTicketLists<any>({
        filterValues: ticketsFiltered,
        page: PAGINATION?.CURRENT_PAGE,
      }),
    );
    onClose();
  };

  const resetTicketFilterForm = async () => {
    if (!!Object?.keys(filterTicketLists)?.length) {
      dispatch(emptyFilterTicketLists());
    }
    reset();
    dispatch(setIsPortalClose());
  };

  const onClose = () => {
    reset?.();
    dispatch(setIsPortalClose());
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
    isPortalOpen,
  };
};
