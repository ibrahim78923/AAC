import { AIR_SERVICES } from '@/constants';
import usePath from '@/hooks/usePath';
import { useDeleteTicketsMutation } from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { TicketActionComponentPropsI } from '../TicketsLists/TicketsLists.interface';
import { PAGINATION } from '@/config';

export const useTicketDelete = (props: TicketActionComponentPropsI) => {
  const router = useRouter();
  const { makePath } = usePath();
  const {
    setIsDrawerOpen,
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
      const newPage =
        selectedTicketList?.length === totalRecords
          ? PAGINATION?.CURRENT_PAGE
          : page;
      setPage?.(newPage);
      await getTicketsListData?.(newPage);
      router?.push(
        makePath({
          path: AIR_SERVICES?.TICKETS,
          skipQueries: ['ticketAction'],
        }),
      );
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeTicketsDeleteModal = () => {
    !isMoveBack &&
      router?.push(
        makePath({
          path: router?.pathname,
          skipQueries: ['ticketAction'],
        }),
      );
    setSelectedTicketList?.([]);
    setIsDrawerOpen?.(false);
  };

  return {
    deleteTicket,
    closeTicketsDeleteModal,
    deleteTicketsStatus,
  };
};
