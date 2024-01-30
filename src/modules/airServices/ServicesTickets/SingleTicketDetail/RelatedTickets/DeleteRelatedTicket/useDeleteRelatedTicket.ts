import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useDeleteChildTicketsMutation } from '@/services/airServices/tickets/single-ticket-details/related-tickets';
import { enqueueSnackbar } from 'notistack';

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
      (ticketId: any) => deleteParams?.append('Ids', ticketId),
    );
    const deleteTicketsParameter = {
      queryParams: deleteParams,
    };
    try {
      await deleteChildTicketsTrigger(deleteTicketsParameter)?.unwrap();
      enqueueSnackbar('Child Ticket deleted successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setSelectedChildTickets([]);
      setPage(1);
      closeTicketsDeleteModal?.();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.error ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
      setSelectedChildTickets([]);
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
