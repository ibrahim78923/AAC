import { AlertModals } from '@/components/AlertModals';
import { AlertModalDeleteIcon } from '@/assets/icons';
import { RestoreDeleteModalProps } from '../Restore-interface';

const RestoreDeleteModal = ({
  open,
  onClose,
  updateRestoreLoading,
  handlePermanantDeleteRetore,
}: RestoreDeleteModalProps) => {
  return (
    <AlertModals
      typeImage={<AlertModalDeleteIcon />}
      message="You're about to delete a Record Permanently. This action can’t be undone"
      type="Permanently Delete"
      open={open}
      handleClose={onClose}
      handleSubmitBtn={handlePermanantDeleteRetore}
      loading={updateRestoreLoading}
    />
  );
};

export default RestoreDeleteModal;
