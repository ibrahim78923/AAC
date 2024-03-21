import { AlertModals } from '@/components/AlertModals';

const DeleteModal = ({ open, onClose, handleSubmit, loading }: any) => {
  return (
    <>
      <AlertModals
        message="You’re about to delete Contacts. Deleted Contacts can’t be resorted after 90 days."
        type="delete"
        open={open}
        handleClose={onClose}
        handleSubmitBtn={handleSubmit}
        loading={loading}
      />
    </>
  );
};

export default DeleteModal;
