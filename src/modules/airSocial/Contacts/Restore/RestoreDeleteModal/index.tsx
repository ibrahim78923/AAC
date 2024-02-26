import { AlertModals } from '@/components/AlertModals';

const RestoreDeleteModal = ({ open, onClose, handlePermanantDelete }: any) => {
  return (
    <AlertModals
      message="You're about to delete a record permanently. This action can’t be undone"
      type="delete"
      open={open}
      handleClose={onClose}
      handleSubmit={handlePermanantDelete}
    />
  );
};

export default RestoreDeleteModal;
