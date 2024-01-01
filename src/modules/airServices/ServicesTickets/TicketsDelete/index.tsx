import { AlertModals } from '@/components/AlertModals';
import { useTicketDelete } from './useTicketsDelete';
import { AlertModalDeleteIcon } from '@/assets/icons';

export const TicketsDelete = (props: any) => {
  const { deleteModalOpen } = props;
  const { deleteTicket, closeTicketsDeleteModal } = useTicketDelete(props);
  return (
    <AlertModals
      type="delete Ticket"
      typeImage={<AlertModalDeleteIcon />}
      message="Are you sure you want to delete the selected ticket ?"
      open={deleteModalOpen}
      handleClose={() => closeTicketsDeleteModal?.()}
      handleSubmitBtn={() => deleteTicket?.()}
    />
  );
};
