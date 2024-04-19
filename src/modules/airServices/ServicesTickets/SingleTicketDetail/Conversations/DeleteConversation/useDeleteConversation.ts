import { useDeleteTicketConversationMutation } from '@/services/airServices/tickets/single-ticket-details/conversation';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteConversation = (props: any) => {
  const { selectedConversationType, setIsDrawerOpen, refetch } = props;

  const [deleteTicketConversationTrigger, deleteTicketConversationStatus] =
    useDeleteTicketConversationMutation();

  const deleteConversation = async () => {
    const deleteApiParameter = {
      queryParams: {
        id: selectedConversationType?._id,
      },
    };
    try {
      const response =
        await deleteTicketConversationTrigger(deleteApiParameter)?.unwrap();

      successSnackbar(response?.message);
      setIsDrawerOpen?.({});
      refetch?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeDeleteModal = () => {
    setIsDrawerOpen?.({});
  };

  return {
    deleteTicketConversationStatus,
    deleteConversation,
    closeDeleteModal,
  };
};
