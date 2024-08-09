import { AlertModals } from '@/components/AlertModals';
import { DeleteModalProps } from '../DealsModalBox-interface';

const DeleteModal = ({
  open,
  onClose,
  handleSubmitBtn,
  loading,
}: DeleteModalProps) => {
  return (
    <AlertModals
      message="You're about to delete a record. Deleted records can't be restored after 90 days."
      type="delete"
      open={open}
      handleClose={onClose}
      handleSubmitBtn={handleSubmitBtn}
      loading={loading}
    />
  );
};

export default DeleteModal;
