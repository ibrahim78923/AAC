import { AlertModals } from '@/components/AlertModals';

import { AlertModalDeleteIcon } from '@/assets/icons';
import useRestore from '../useRestore';

const RestoreDeleteModal = ({
  open,
  onClose,
  handlePermanantDeleteRetore,
}: any) => {
  const { restoreLoading } = useRestore();

  return (
    <AlertModals
      typeImage={<AlertModalDeleteIcon />}
      message="You're about to delete a Record Permanently. This action can’t be undone"
      type="Permanently Delete"
      open={open}
      handleClose={onClose}
      handleSubmitBtn={handlePermanantDeleteRetore}
      isLoading={restoreLoading}
    ></AlertModals>
  );
};

export default RestoreDeleteModal;
