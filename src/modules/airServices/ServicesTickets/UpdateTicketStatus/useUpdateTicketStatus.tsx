import { ARRAY_INDEX } from '@/constants/strings';
import { usePutSingleTicketStatusMutation } from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { TicketActionComponentPropsI } from '../TicketsLists/TicketsLists.interface';

export const useUpdateTicketStatus = (props: TicketActionComponentPropsI) => {
  const {
    setIsPortalOpen,
    setSelectedTicketList,
    selectedTicketList,
    isPortalOpen,
  } = props;

  const [putSingleTicketStatusTrigger, putSingleTicketStatusStatus] =
    usePutSingleTicketStatusMutation();

  const updateTicketStatus = async () => {
    const updateTicketStatusTicketsParameter = {
      queryParams: {
        status: isPortalOpen?.status,
        id: selectedTicketList?.[ARRAY_INDEX?.ZERO],
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
    setSelectedTicketList?.([]);
    setIsPortalOpen?.({});
  };

  return {
    putSingleTicketStatusStatus,
    closeModal,
    updateTicketStatus,
  };
};
