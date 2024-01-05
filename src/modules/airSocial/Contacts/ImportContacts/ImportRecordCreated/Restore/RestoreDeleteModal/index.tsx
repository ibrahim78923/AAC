import { AlertModals } from '@/components/AlertModals';

import { AlertModalDeleteIcon } from '@/assets/icons';

const RestoreDeleteModal = ({ open, onClose, handlePermanantDelete }: any) => {
  return (
    <AlertModals
      typeImage={<AlertModalDeleteIcon />}
      message="You’re about to delete a activity permanently. This action can’t be undone."
      type="Permanently Delete"
      open={open}
      handleClose={onClose}
      handleSubmit={handlePermanantDelete}
    />
  );
};

export default RestoreDeleteModal;
