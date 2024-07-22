import { AlertModals } from '@/components/AlertModals';

const DeleteModal = ({ open, onClose, handleSubmit, loading }: any) => {
  return (
    <>
      <AlertModals
        message={`Are you sure you want to delete it? Deleted records can’t be restored after 90 days.`}
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
