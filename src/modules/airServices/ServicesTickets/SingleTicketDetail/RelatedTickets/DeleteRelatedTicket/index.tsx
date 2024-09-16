import { AlertModals } from '@/components/AlertModals';
import { AlertModalDeleteIcon } from '@/assets/icons';
import { useDeleteRelatedTicket } from './useDeleteRelatedTicket';

export const DeleteRelatedTicket = () => {
  const {
    deleteTicket,
    closeTicketsDeleteModal,
    deleteChildTicketsStatus,
    isPortalOpen,
  } = useDeleteRelatedTicket();

  return (
    <AlertModals
      type="delete Ticket"
      typeImage={<AlertModalDeleteIcon />}
      message="Are you sure you want to delete the selected ticket ?"
      open={isPortalOpen?.isOpen}
      handleClose={closeTicketsDeleteModal}
      handleSubmitBtn={deleteTicket}
      loading={deleteChildTicketsStatus?.isLoading}
      disableCancelBtn={deleteChildTicketsStatus?.isLoading}
    />
  );
};
