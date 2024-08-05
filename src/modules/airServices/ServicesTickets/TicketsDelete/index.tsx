import { AlertModals } from '@/components/AlertModals';
import { useTicketDelete } from './useTicketsDelete';
import { AlertModalDeleteIcon } from '@/assets/icons';
import { TicketActionComponentPropsI } from '../TicketsLists/TicketsLists.interface';

export const TicketsDelete = (props: TicketActionComponentPropsI) => {
  const { isDrawerOpen } = props;
  const { deleteTicket, closeTicketsDeleteModal, deleteTicketsStatus } =
    useTicketDelete(props);

  return (
    <AlertModals
      type="delete Ticket"
      typeImage={<AlertModalDeleteIcon />}
      message="Are you sure you want to delete the selected ticket ?"
      open={isDrawerOpen}
      handleClose={() => closeTicketsDeleteModal?.()}
      handleSubmitBtn={() => deleteTicket?.()}
      loading={deleteTicketsStatus?.isLoading}
      disableCancelBtn={deleteTicketsStatus?.isLoading}
    />
  );
};
