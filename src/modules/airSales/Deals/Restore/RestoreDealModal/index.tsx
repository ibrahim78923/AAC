import { AlertModals } from '@/components/AlertModals';
import { RestoreDealsIcon } from '@/assets/icons';
import useRestore from '../useRestore';
import { RestoreDeleteModalProps } from '../Restore-interface';

const RestoreDealModal = ({
  open,
  onClose,
  handlePermanantDeleteRetore,
}: RestoreDeleteModalProps) => {
  const { updateRestoreLoading } = useRestore();
  return (
    <>
      <AlertModals
        typeImage={<RestoreDealsIcon />}
        message="You are about to restore record"
        type="restore"
        open={open}
        handleClose={onClose}
        handleSubmitBtn={handlePermanantDeleteRetore}
        isLoading={updateRestoreLoading}
      />
    </>
  );
};

export default RestoreDealModal;
