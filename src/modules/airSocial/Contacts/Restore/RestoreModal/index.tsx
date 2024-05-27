import { RestoreContactIcon } from '@/assets/icons';
import { AlertModals } from '@/components/AlertModals';

const RestoreModal = ({ open, onClose, handleSubmit, loading }: any) => {
  return (
    <AlertModals
      message="You are about to restore a Contacts."
      type="restore"
      submitBtnText="Restore"
      open={open}
      handleClose={onClose}
      handleSubmitBtn={handleSubmit}
      loading={loading}
      typeImage={<RestoreContactIcon />}
    />
  );
};

export default RestoreModal;
