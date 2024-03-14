import { AIR_SERVICES } from '@/constants';
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
    getTicketsListData,
    totalRecords,
    page,
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
      setSelectedTicketList?.([]);
      const newPage = selectedTicketList?.length === totalRecords ? 1 : page;
      setPage?.(newPage);
      await getTicketsListData?.(newPage);
      router?.push(
        makePath({
          path: AIR_SERVICES?.TICKETS,
          skipQueries: ['ticketAction'],
        }),
      );
      closeTicketsDeleteModal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setSelectedTicketList?.([]);
      closeTicketsDeleteModal?.();
    }
  };
  const closeTicketsDeleteModal = () => {
    setDeleteModalOpen?.(false);
  };

  return {
    deleteTicket,
    closeTicketsDeleteModal,
    deleteTicketsStatus,
  };
};
