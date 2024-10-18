import { AlertModals } from '@/components/AlertModals';
import { RestoreDealsIcon } from '@/assets/icons';
import { RestoreDeleteModalProps } from '../Restore-interface';

const RestoreDealModal = ({
  open,
  onClose,
  updateRestoreLoading,
  handlePermanantDeleteRetore,
}: RestoreDeleteModalProps) => {
  return (
    <>
      <AlertModals
        typeImage={<RestoreDealsIcon />}
        message="You are about to restore record"
        type="restore"
        open={open}
        handleClose={onClose}
        handleSubmitBtn={handlePermanantDeleteRetore}
        loading={updateRestoreLoading}
      />
    </>
  );
};

export default RestoreDealModal;
