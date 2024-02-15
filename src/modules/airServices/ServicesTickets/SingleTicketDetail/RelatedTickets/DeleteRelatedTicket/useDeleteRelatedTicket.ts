import { useDeleteChildTicketsMutation } from '@/services/airServices/tickets/single-ticket-details/related-tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteRelatedTicket = (props: any) => {
  const {
    setIsDelete,
    selectedChildTickets,
    setSelectedChildTickets,
    setPage,
  } = props;
  const [deleteChildTicketsTrigger, deleteChildTicketsStatus] =
    useDeleteChildTicketsMutation();

  const deleteTicket = async () => {
    const deleteParams = new URLSearchParams();
    selectedChildTickets?.forEach(
      (ticketId: any) => deleteParams?.append('ids', ticketId),
    );
    const deleteTicketsParameter = {
      queryParams: deleteParams,
    };
    try {
      await deleteChildTicketsTrigger(deleteTicketsParameter)?.unwrap();
      successSnackbar('Child Ticket deleted successfully');
      setSelectedChildTickets?.([]);
      setPage?.(1);
      closeTicketsDeleteModal?.();
    } catch (error: any) {
      errorSnackbar();
      setSelectedChildTickets?.([]);
      closeTicketsDeleteModal?.();
    }
  };
  const closeTicketsDeleteModal = () => {
    setIsDelete?.(false);
  };

  return {
    deleteTicket,
    closeTicketsDeleteModal,
    deleteChildTicketsStatus,
  };
};
