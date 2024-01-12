import { AlertModals } from '@/components/AlertModals';

const RestoreDeleteModal = ({ open, onClose, handlePermanantDelete }: any) => {
  return (
    <AlertModals
      message="You're about to delete a Record Permanently. This action can’t be undone"
      type="delete"
      open={open}
      handleClose={onClose}
      handleSubmitBtn={handlePermanantDelete}
    />
  );
};

export default RestoreDeleteModal;
