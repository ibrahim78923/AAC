import { AIR_SERVICES } from '@/constants';
import { useDeleteTicketsMutation } from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { PAGINATION } from '@/config';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useGetTicketList } from '../TicketsServicesHooks/useGetTicketList';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airServices/tickets/slice';

export const useTicketDelete = () => {
  const router = useRouter();
  const { ticketId } = router?.query;
  const dispatch = useAppDispatch();

  const { getTicketsListData, page } = useGetTicketList();

  const selectedTicketLists = useAppSelector(
    (state) => state?.servicesTickets?.selectedTicketLists,
  );
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTickets?.isPortalOpen,
  );
  const totalRecords = useAppSelector(
    (state) => state?.servicesTickets?.totalRecords,
  );
  const isMoveBack = !!ticketId;

  const [deleteTicketsTrigger, deleteTicketsStatus] =
    useDeleteTicketsMutation();

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
      isMoveBack &&
        router?.push({
          pathname: AIR_SERVICES?.TICKETS,
        });
      const newPage =
        selectedTicketLists?.length === totalRecords
          ? PAGINATION?.CURRENT_PAGE
          : page;
      dispatch(setPage?.(newPage));
      await getTicketsListData?.(newPage);
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
