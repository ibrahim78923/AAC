import { AlertModals } from '@/components/AlertModals';

import { AlertModalDeleteIcon } from '@/assets/icons';

const RestoreDeleteModal = ({ open, onClose, handlePermanantDelete }: any) => {
  return (
    <AlertModals
      typeImage={<AlertModalDeleteIcon />}
      message="You're about to delete a Record Permanently. This action can’t be undone"
      type="Permanantly Delete"
      open={open}
      handleClose={onClose}
      handleSubmit={handlePermanantDelete}
    ></AlertModals>
  );
};

export default RestoreDeleteModal;
