import { AlertModals } from '@/components/AlertModals';
import { AlertModalDeleteIcon } from '@/assets/icons';
import { useDeleteRelatedTicket } from './useDeleteRelatedTicket';
import { RelatedTicketsPortalComponentPropsI } from '../RelatedTickets.interface';

export const DeleteRelatedTicket = (
  props: RelatedTicketsPortalComponentPropsI,
) => {
  const { isPortalOpen } = props;
  const { deleteTicket, closeTicketsDeleteModal, deleteChildTicketsStatus } =
    useDeleteRelatedTicket(props);

  return (
    <AlertModals
      type="delete Ticket"
      typeImage={<AlertModalDeleteIcon />}
      message="Are you sure you want to delete the selected ticket ?"
      open={isPortalOpen?.isDelete}
      handleClose={() => closeTicketsDeleteModal?.()}
      handleSubmitBtn={() => deleteTicket?.()}
      loading={deleteChildTicketsStatus?.isLoading}
      disableCancelBtn={deleteChildTicketsStatus?.isLoading}
    />
  );
};
