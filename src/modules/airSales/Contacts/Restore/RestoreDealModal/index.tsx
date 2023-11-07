import { AlertModals } from '@/components/AlertModals';

import { RestoreDealsIcon } from '@/assets/icons';

const RestoreDealModal = ({ open, onClose, handlePermanantDelete }: any) => {
  return (
    <>
      <AlertModals
        typeImage={<RestoreDealsIcon />}
        message="You're about to delete a record. Deleted records can't be restored after 90 days."
        type="delete"
        open={open}
        handleClose={onClose}
        handleSubmit={handlePermanantDelete}
      />
    </>
  );
};

export default RestoreDealModal;
