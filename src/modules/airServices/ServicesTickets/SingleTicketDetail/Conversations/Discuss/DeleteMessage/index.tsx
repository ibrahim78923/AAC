import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteMessage } from './useDeleteMessage';

export const DeleteMessage = (props: any) => {
  const { selectedMessage } = props;
  const {
    deleteDiscussionsOfTicketConversationStatus,
    deleteConversationMessage,
    closeDeleteModal,
  } = useDeleteMessage(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Do you want to delete the message ? "
      open={selectedMessage?.isDelete}
      handleClose={() => closeDeleteModal?.()}
      handleSubmitBtn={() => deleteConversationMessage?.()}
      loading={deleteDiscussionsOfTicketConversationStatus?.isLoading}
      disableCancelBtn={deleteDiscussionsOfTicketConversationStatus?.isLoading}
    />
  );
};
