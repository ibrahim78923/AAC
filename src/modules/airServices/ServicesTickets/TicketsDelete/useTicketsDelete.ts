import usePath from '@/hooks/usePath';
import { useDeleteTicketsMutation } from '@/services/airServices/tickets';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';

export const useTicketDelete = (props: any) => {
  const router = useRouter();
  const { makePath } = usePath();
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
      )?.unwrap();
      enqueueSnackbar(response?.message ?? 'Ticket deleted successfully', {
        variant: 'success',
      });
      closeTicketsDeleteModal?.();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Error', {
        variant: 'error',
      });
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
  };
};
