import { ARRAY_INDEX } from '@/constants/strings';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airServices/tickets/slice';
import { useRouter } from 'next/router';
import { useGetTicketList } from '../TicketsServicesHooks/useGetTicketList';
import { AIR_SERVICES } from '@/constants';
import { PAGINATION } from '@/config';
import { useUpdateSingleServicesTicketStatusMutation } from '@/services/airServices/tickets';

export const useUpdateTicketStatus = () => {
  const router = useRouter();
  const { ticketId } = router?.query;

  const { getTicketsListData, page } = useGetTicketList();

  const dispatch = useAppDispatch();
  const selectedTicketLists = useAppSelector(
    (state) => state?.servicesTickets?.selectedTicketLists,
  );

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTickets?.isPortalOpen,
  );

  const totalRecords = useAppSelector(
    (state) => state?.servicesTickets?.totalRecords,
  );

  const isMoveBack = !!ticketId;
  const [putSingleTicketStatusTrigger, putSingleTicketStatusStatus] =
    useUpdateSingleServicesTicketStatusMutation();

  const updateTicketStatus = async () => {
    const updateTicketStatusTicketsParameter = {
      queryParams: {
        status: isPortalOpen?.status,
        id: selectedTicketLists?.[ARRAY_INDEX?.ZERO]?._id,
      },
    };
    try {
      await putSingleTicketStatusTrigger(
        updateTicketStatusTicketsParameter,
      )?.unwrap();
      successSnackbar(
        `Ticket marked as ${isPortalOpen?.status?.toLowerCase()} successfully`,
      );
      closeModal?.();
      await refetchApi?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeModal = () => {
    dispatch(emptySelectedTicketLists());
    dispatch(setIsPortalClose());
  };

  const refetchApi = async () => {
    if (isMoveBack) {
      router?.push({
        pathname: AIR_SERVICES?.TICKETS,
      });
      return;
    }

    const newPage =
      selectedTicketLists?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage?.(newPage));
    await getTicketsListData?.(newPage);
  };

  return {
    putSingleTicketStatusStatus,
    closeModal,
    updateTicketStatus,
    isPortalOpen,
  };
};
