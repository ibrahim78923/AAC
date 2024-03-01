import { AlertModals } from '@/components/AlertModals';

const RestoreModal = ({ open, onClose, handleSubmit }: any) => {
  return (
    <AlertModals
      message="You are about to restore a Contacts."
      type="success"
      submitBtnText="Restore"
      open={open}
      handleClose={onClose}
      handleSubmitBtn={handleSubmit}
    />
  );
};

export default RestoreModal;
