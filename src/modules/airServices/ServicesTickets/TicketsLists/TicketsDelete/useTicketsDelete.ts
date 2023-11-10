import { useDeleteTicketsMutation } from '@/services/airServices/tickets';
import { enqueueSnackbar } from 'notistack';

export const useTicketDelete = (props: any) => {
  const { setDeleteModalOpen, selectedTicketList } = props;
  const [deleteTicketsTrigger] = useDeleteTicketsMutation();
  const deleteTicket = async () => {
    const deleteParams = new URLSearchParams();
    selectedTicketList?.forEach(
      (ticketId: any) => deleteParams?.append('ids', ticketId),
    );
    const deleteTicketsParameter = {
      queryParams: deleteParams,
    };
    try {
      const response: any = await deleteTicketsTrigger(
        deleteTicketsParameter,
      ).unwrap();
      enqueueSnackbar('Ticket deleted successfully', {
        variant: 'success',
      });
      setDeleteModalOpen(false);
      return response;
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Error', {
        variant: 'error',
      });
    }
  };
  return {
    deleteTicket,
  };
};
