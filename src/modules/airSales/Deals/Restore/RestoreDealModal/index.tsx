import { AlertModals } from '@/components/AlertModals';

import { RestoreDealsIcon } from '@/assets/icons';

const RestoreDealModal = ({
  open,
  onClose,
  handlePermanantDeleteRetore,
}: any) => {
  return (
    <>
      <AlertModals
        typeImage={<RestoreDealsIcon />}
        message="You are about to restore record"
        type="restore"
        open={open}
        handleClose={onClose}
        handleSubmitBtn={handlePermanantDeleteRetore}
      />
    </>
  );
};

export default RestoreDealModal;
