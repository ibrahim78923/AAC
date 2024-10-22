import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useDeleteDiscussionsOfTicketConversationMutation } from '@/services/airServices/tickets/single-ticket-details/conversation/discussion';

export const useDeleteMessage = (props: any) => {
  const { selectedMessage, setSelectedMessage } = props;

  const [
    deleteDiscussionsOfTicketConversationTrigger,
    deleteDiscussionsOfTicketConversationStatus,
  ] = useDeleteDiscussionsOfTicketConversationMutation();

  const deleteConversationMessage = async () => {
    const deleteApiParameter = {
      queryParams: {
        ticketId: selectedMessage?.ticketId,
        discussionId: selectedMessage?._id,
      },
    };
    try {
      const response =
        await deleteDiscussionsOfTicketConversationTrigger(
          deleteApiParameter,
        )?.unwrap();

      successSnackbar(response?.message);
      setSelectedMessage?.({});
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeDeleteModal = () => {
    setSelectedMessage?.({});
  };

  return {
    deleteDiscussionsOfTicketConversationStatus,
    deleteConversationMessage,
    closeDeleteModal,
  };
};
