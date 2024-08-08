import { AlertModals } from '@/components/AlertModals';
import { AlertModalDeleteIcon } from '@/assets/icons';
import useRestore from '../useRestore';
import { RestoreDeleteModalProps } from '../Restore-interface';

const RestoreDeleteModal = ({
  open,
  onClose,
  handlePermanantDeleteRetore,
}: RestoreDeleteModalProps) => {
  const { updateRestoreLoading } = useRestore();

  return (
    <AlertModals
      typeImage={<AlertModalDeleteIcon />}
      message="You're about to delete a Record Permanently. This action can’t be undone"
      type="Permanently Delete"
      open={open}
      handleClose={onClose}
      handleSubmitBtn={handlePermanantDeleteRetore}
      isLoading={updateRestoreLoading}
    ></AlertModals>
  );
};

export default RestoreDeleteModal;
