import { AlertModals } from '@/components/AlertModals';

const RestoreDeleteModal = ({
  open,
  onClose,
  handlePermanantDelete,
  loading,
}: any) => {
  return (
    <AlertModals
      message="You're about to delete a record permanently. This action can’t be undone"
      type="delete"
      open={open}
      handleClose={onClose}
      handleSubmitBtn={handlePermanantDelete}
      loading={loading}
    />
  );
};

export default RestoreDeleteModal;
