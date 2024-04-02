import { useDeleteDiscussionsOfTicketConversationMutation } from '@/services/airServices/tickets/single-ticket-details/conversation/discussion';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteConversation = (props: any) => {
  const { selectedConversationType, setIsDrawerOpen } = props;

  const [
    deleteDiscussionsOfTicketConversationTrigger,
    deleteDiscussionsOfTicketConversationStatus,
  ] = useDeleteDiscussionsOfTicketConversationMutation();

  const deleteConversation = async () => {
    const deleteApiParameter = {
      queryParams: {
        ticketId: selectedConversationType?.ticketId,
        discussionId: selectedConversationType?._id,
      },
    };
    try {
      const response =
        await deleteDiscussionsOfTicketConversationTrigger(
          deleteApiParameter,
        )?.unwrap();

      successSnackbar(response?.message);
      setIsDrawerOpen?.({});
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeDeleteModal = () => {
    setIsDrawerOpen?.({});
  };

  return {
    deleteDiscussionsOfTicketConversationStatus,
    deleteConversation,
    closeDeleteModal,
  };
};
