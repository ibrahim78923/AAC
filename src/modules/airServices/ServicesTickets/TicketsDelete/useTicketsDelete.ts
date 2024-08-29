import { AIR_SERVICES } from '@/constants';
import { useDeleteTicketsMutation } from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { TicketActionComponentPropsI } from '../TicketsLists/TicketsLists.interface';
import { PAGINATION } from '@/config';

export const useTicketDelete = (props: TicketActionComponentPropsI) => {
  const router = useRouter();
  const {
    setIsPortalOpen,
    selectedTicketList,
    setSelectedTicketList,
    setPage,
    getTicketsListData,
    totalRecords,
    page,
    isMoveBack = false,
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
      closeTicketsDeleteModal?.();
      isMoveBack &&
        router?.push({
          pathname: AIR_SERVICES?.TICKETS,
        });
      const newPage =
        selectedTicketList?.length === totalRecords
          ? PAGINATION?.CURRENT_PAGE
          : page;
      setPage?.(newPage);
      await getTicketsListData?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeTicketsDeleteModal = () => {
    setSelectedTicketList?.([]);
    setIsPortalOpen?.({});
  };

  return {
    deleteTicket,
    closeTicketsDeleteModal,
    deleteTicketsStatus,
  };
};
