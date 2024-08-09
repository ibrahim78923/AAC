import { PAGINATION } from '@/config';
import { useDeleteChildTicketsMutation } from '@/services/airServices/tickets/single-ticket-details/related-tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { RelatedTicketsPortalComponentPropsI } from '../RelatedTickets.interface';

export const useDeleteRelatedTicket = (
  props: RelatedTicketsPortalComponentPropsI,
) => {
  const {
    setIsPortalOpen,
    selectedChildTickets,
    setSelectedChildTickets,
    setPage,
    getChildTicketsListData,
    page,
    totalRecords,
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
      closeTicketsDeleteModal?.();
      const newPage =
        selectedChildTickets?.length === totalRecords
          ? PAGINATION?.CURRENT_PAGE
          : page;
      setPage?.(newPage);
      await getChildTicketsListData?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeTicketsDeleteModal = () => {
    setSelectedChildTickets?.([]);
    setIsPortalOpen?.({});
  };

  return {
    deleteTicket,
    closeTicketsDeleteModal,
    deleteChildTicketsStatus,
  };
};
