import { useUpdateBulkServicesTicketsMutation } from '@/services/airServices/tickets';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airServices/tickets/slice';
import { useGetTicketList } from '../TicketsServicesHooks/useGetTicketList';
import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  servicesTicketsIsPortalOpenSelector,
  servicesTicketsSelectedTicketListsSelector,
  servicesTicketsTotalRecordsSelector,
} from '@/redux/slices/airServices/tickets/selectors';
import {
  assignedTicketsFormDefaultValues,
  assignedTicketsFormValidationSchema,
} from './AssignedTickets.data';
import { useFormLib } from '@/hooks/useFormLib';

export const useAssignedTickets = () => {
  const dispatch = useAppDispatch();
  const { getTicketsListData, page } = useGetTicketList();

  const totalRecords = useAppSelector(servicesTicketsTotalRecordsSelector);

  const selectedTicketLists = useAppSelector(
    servicesTicketsSelectedTicketListsSelector,
  );

  const isPortalOpen = useAppSelector(servicesTicketsIsPortalOpenSelector);

  const [patchBulkUpdateTicketsTrigger, patchBulkUpdateTicketsStatus] =
    useUpdateBulkServicesTicketsMutation();

  const formLibProps = {
    defaultValues: assignedTicketsFormDefaultValues,
    validationSchema: assignedTicketsFormValidationSchema,
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const refetchApi = async () => {
    const newPage =
      selectedTicketLists?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage?.(newPage));
    await getTicketsListData?.(newPage);
  };

  const submitAssignedTicketsForm = async (formData: {
    agent: AutocompleteAsyncOptionsI;
  }) => {
    const queryParams = new URLSearchParams();
    selectedTicketLists?.forEach(
      (ticketId: any) => queryParams?.append('ids', ticketId?._id),
    );

    const body = {
      agent: formData?.agent?._id,
    };

    const apiDataParameter = {
      queryParams,
      body,
    };

    try {
      await patchBulkUpdateTicketsTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Ticket assigned successfully');
      closePortal?.();
      await refetchApi();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closePortal = () => {
    reset();
    dispatch(emptySelectedTicketLists());
    dispatch(setIsPortalClose());
  };

  const apiCallInProgress = patchBulkUpdateTicketsStatus?.isLoading;

  return {
    methods,
    handleSubmit,
    submitAssignedTicketsForm,
    closePortal,
    patchBulkUpdateTicketsStatus,
    isPortalOpen,
    apiCallInProgress,
  };
};
