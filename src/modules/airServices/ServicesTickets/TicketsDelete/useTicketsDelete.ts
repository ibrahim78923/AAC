import usePath from '@/hooks/usePath';
import { useDeleteTicketsMutation } from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';

export const useTicketDelete = (props: any) => {
  const router = useRouter();
  const { makePath } = usePath();
  const {
    setDeleteModalOpen,
    selectedTicketList,
    setSelectedTicketList,
    setPage,
  } = props;
  const [deleteTicketsTrigger, deleteTicketsStatus] =
    useDeleteTicketsMutation();
  const deleteTicket = async () => {
    const deleteParams = new URLSearchParams();
    selectedTicketList?.forEach(
      (ticketId: any) => deleteParams?.append('Ids', ticketId),
    );
    const deleteTicketsParameter = {
      queryParams: deleteParams,
    };
    try {
      await deleteTicketsTrigger(deleteTicketsParameter)?.unwrap();
      successSnackbar('Ticket deleted successfully');
      setSelectedTicketList([]);
      setPage(1);
      closeTicketsDeleteModal?.();
    } catch (error: any) {
      errorSnackbar();
      setSelectedTicketList([]);
      closeTicketsDeleteModal?.();
    }
  };
  const closeTicketsDeleteModal = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['ticketAction'],
      }),
    );
    setDeleteModalOpen?.(false);
  };

  return {
    deleteTicket,
    closeTicketsDeleteModal,
    deleteTicketsStatus,
  };
};
