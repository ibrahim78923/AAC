import { AlertModals } from '@/components/AlertModals';
import { useDeleteConversation } from './useDeleteConversation';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const DeleteConversation = (props: any) => {
  const { selectedConversationType } = props;
  const {
    deleteDiscussionsOfTicketConversationStatus,
    deleteConversation,
    closeDeleteModal,
  } = useDeleteConversation(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Do you want to delete the conversation ? "
      open={selectedConversationType?.isDelete}
      handleClose={() => closeDeleteModal?.()}
      handleSubmitBtn={() => deleteConversation?.()}
      loading={deleteDiscussionsOfTicketConversationStatus?.isLoading}
      disableCancelBtn={deleteDiscussionsOfTicketConversationStatus?.isLoading}
    />
  );
};
