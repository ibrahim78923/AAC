import { AlertModals } from '@/components/AlertModals';
import { useTicketDelete } from './useTicketsDelete';
import { AlertModalDeleteIcon } from '@/assets/icons';

const TicketsDelete = () => {
  const {
    deleteTicket,
    closeTicketsDeleteModal,
    deleteTicketsStatus,
    isPortalOpen,
  } = useTicketDelete();

  return (
    <AlertModals
      type="delete Ticket"
      typeImage={<AlertModalDeleteIcon />}
      message="Are you sure you want to delete the selected ticket ?"
      open={isPortalOpen?.isOpen as boolean}
      handleClose={closeTicketsDeleteModal}
      handleSubmitBtn={deleteTicket}
      loading={deleteTicketsStatus?.isLoading}
      disableCancelBtn={deleteTicketsStatus?.isLoading}
    />
  );
};

export default TicketsDelete;
