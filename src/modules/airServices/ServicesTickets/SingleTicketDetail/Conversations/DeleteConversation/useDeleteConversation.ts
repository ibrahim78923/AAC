import { setIsPortalClose } from '@/redux/slices/airServices/ticket-conversation/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useDeleteServicesTicketSingleConversationMutation } from '@/services/airServices/tickets/single-ticket-details/conversation';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useGetTicketConversationList } from '../../../TicketsServicesHooks/useGetTicketConversationList';

export const useDeleteConversation = () => {
  const { getTicketConversationListData } = useGetTicketConversationList?.();
  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTicketConversation?.isPortalOpen,
  );
  const [deleteTicketConversationTrigger, deleteTicketConversationStatus] =
    useDeleteServicesTicketSingleConversationMutation();

  const deleteConversation = async () => {
    const deleteApiParameter = {
      queryParams: {
        id: isPortalOpen?.data?._id,
      },
    };
    try {
      const response =
        await deleteTicketConversationTrigger(deleteApiParameter)?.unwrap();
      successSnackbar(response?.message);
      closeDeleteModal?.();
      await getTicketConversationListData?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeDeleteModal = () => {
    dispatch(setIsPortalClose());
  };

  return {
    deleteTicketConversationStatus,
    deleteConversation,
    closeDeleteModal,
    isPortalOpen,
  };
};
