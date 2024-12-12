import { useRouter } from 'next/router';
import { PAGINATION } from '@/config';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useGetTicketList } from '../TicketsServicesHooks/useGetTicketList';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airServices/tickets/slice';
import { useDeleteMultipleServicesTicketsMutation } from '@/services/airServices/tickets';
import { AIR_SERVICES } from '@/constants/routes';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  servicesTicketsIsPortalOpenSelector,
  servicesTicketsSelectedTicketListsSelector,
  servicesTicketsTotalRecordsSelector,
} from '@/redux/slices/airServices/tickets/selectors';

export const useTicketDelete = () => {
  const router = useRouter();
  const { ticketId } = router?.query;
  const dispatch = useAppDispatch();

  const { getTicketsListData, page } = useGetTicketList();

  const selectedTicketLists = useAppSelector(
    servicesTicketsSelectedTicketListsSelector,
  );
  const isPortalOpen = useAppSelector(servicesTicketsIsPortalOpenSelector);
  const totalRecords = useAppSelector(servicesTicketsTotalRecordsSelector);
  const isMoveBack = !!ticketId;

  const refetchApi = async () => {
    if (isMoveBack) {
      router?.push({
        pathname: AIR_SERVICES?.TICKETS,
      });
      return;
    }

    const newPage =
      selectedTicketLists?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage?.(newPage));
    await getTicketsListData?.(newPage);
  };

  const [deleteTicketsTrigger, deleteTicketsStatus] =
    useDeleteMultipleServicesTicketsMutation();

  const deleteTicket = async () => {
    const deleteParams = new URLSearchParams();
    selectedTicketLists?.forEach(
      (ticketId: any) => deleteParams?.append('Ids', ticketId?._id),
    );
    const deleteTicketsParameter = {
      queryParams: deleteParams,
    };
    try {
      await deleteTicketsTrigger(deleteTicketsParameter)?.unwrap();
      successSnackbar('Ticket deleted successfully');
      closeTicketsDeleteModal?.();
      await refetchApi?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeTicketsDeleteModal = () => {
    dispatch(emptySelectedTicketLists());
    dispatch(setIsPortalClose());
  };

  return {
    deleteTicket,
    closeTicketsDeleteModal,
    deleteTicketsStatus,
    isPortalOpen,
  };
};
