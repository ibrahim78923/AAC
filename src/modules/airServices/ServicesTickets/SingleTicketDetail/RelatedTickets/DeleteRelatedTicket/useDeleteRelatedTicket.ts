import { PAGINATION } from '@/config';
import { useDeleteChildTicketsMutation } from '@/services/airServices/tickets/single-ticket-details/related-tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airServices/related-tickets/slice';
import { useGetRelatedTicketList } from '../../../TicketsServicesHooks/useGetRelatedTicketList';

export const useDeleteRelatedTicket = () => {
  const { getChildTicketsListData, page } = useGetRelatedTicketList();
  const dispatch = useAppDispatch();

  const totalRecords = useAppSelector(
    (state) => state?.servicesRelatedTickets?.totalRecords,
  );

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesRelatedTickets?.isPortalOpen,
  );

  const selectedRelatedTicketLists = useAppSelector(
    (state) => state?.servicesRelatedTickets?.selectedRelatedTicketLists,
  );

  const [deleteChildTicketsTrigger, deleteChildTicketsStatus] =
    useDeleteChildTicketsMutation();

  const deleteTicket = async () => {
    const deleteParams = new URLSearchParams();
    selectedRelatedTicketLists?.forEach(
      (ticketId: any) => deleteParams?.append('ids', ticketId),
    );

    const deleteTicketsParameter = {
      queryParams: deleteParams,
    };

    try {
      await deleteChildTicketsTrigger(deleteTicketsParameter)?.unwrap();
      successSnackbar('Child Ticket deleted successfully');
      closeTicketsDeleteModal?.();
      await refetchApi?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const refetchApi = async () => {
    const newPage =
      selectedRelatedTicketLists?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage<any>(newPage));
    await getChildTicketsListData?.(newPage);
  };

  const closeTicketsDeleteModal = () => {
    dispatch(emptySelectedTicketLists());
    dispatch(setIsPortalClose());
  };

  return {
    deleteTicket,
    closeTicketsDeleteModal,
    deleteChildTicketsStatus,
    isPortalOpen,
  };
};
