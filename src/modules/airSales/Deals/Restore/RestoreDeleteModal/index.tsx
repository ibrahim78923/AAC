import { AlertModals } from '@/components/AlertModals';

import { AlertModalDeleteIcon } from '@/assets/icons';

const RestoreDeleteModal = ({
  open,
  onClose,
  handlePermanantDeleteRetore,
}: any) => {
  return (
    <AlertModals
      typeImage={<AlertModalDeleteIcon />}
      message="You're about to delete a Record Permanently. This action can’t be undone"
      type="Permanently Delete"
      open={open}
      handleClose={onClose}
      handleSubmitBtn={handlePermanantDeleteRetore}
    ></AlertModals>
  );
};

export default RestoreDeleteModal;
