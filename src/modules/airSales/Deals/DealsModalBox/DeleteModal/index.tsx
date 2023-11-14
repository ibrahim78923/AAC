import { AlertModals } from '@/components/AlertModals';

const DeleteModal = ({ open, onClose, handleSubmit }: any) => {
  return (
    <>
      <AlertModals
        message="You're about to delete a record. Deleted records can't be restored after 90 days."
        type="delete"
        open={open}
        handleClose={onClose}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default DeleteModal;
