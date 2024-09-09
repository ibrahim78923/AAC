import { ARRAY_INDEX } from '@/constants/strings';
import { usePutSingleTicketStatusMutation } from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
} from '@/redux/slices/airServices/tickets/slice';

export const useUpdateTicketStatus = () => {
  const dispatch = useAppDispatch();
  const selectedTicketLists = useAppSelector(
    (state) => state?.servicesTickets?.selectedTicketLists,
  );

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTickets?.isPortalOpen,
  );

  const [putSingleTicketStatusTrigger, putSingleTicketStatusStatus] =
    usePutSingleTicketStatusMutation();

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
      successSnackbar('Ticket marked as close successfully');
      closeModal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeModal = () => {
    dispatch(emptySelectedTicketLists());
    dispatch(setIsPortalClose());
  };

  return {
    putSingleTicketStatusStatus,
    closeModal,
    updateTicketStatus,
    isPortalOpen,
  };
};
