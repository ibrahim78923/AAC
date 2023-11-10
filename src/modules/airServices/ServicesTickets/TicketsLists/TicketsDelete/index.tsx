import { AlertModals } from '@/components/AlertModals';
import { useTicketDelete } from './useTicketsDelete';

export const TicketsDelete = (props: any) => {
  const { deleteModalOpen, setDeleteModalOpen } = props;
  const { deleteTicket } = useTicketDelete(props);
  return (
    <AlertModals
      type="delete"
      message="Are you sure you want to delete the selected ticket"
      open={deleteModalOpen}
      handleClose={() => setDeleteModalOpen(false)}
      handleSubmitBtn={() => deleteTicket?.()}
    />
  );
};
