import { AlertModals } from '@/components/AlertModals';
import { useDeleteConversation } from './useDeleteConversation';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const DeleteConversation = () => {
  const {
    deleteTicketConversationStatus,
    deleteConversation,
    closeDeleteModal,
    isPortalOpen,
  } = useDeleteConversation();

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Do you want to delete the conversation ? "
      open={isPortalOpen?.isOpen}
      handleClose={closeDeleteModal}
      handleSubmitBtn={deleteConversation}
      loading={deleteTicketConversationStatus?.isLoading}
      disableCancelBtn={deleteTicketConversationStatus?.isLoading}
    />
  );
};
