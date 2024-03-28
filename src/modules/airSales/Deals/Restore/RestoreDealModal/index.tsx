import { AlertModals } from '@/components/AlertModals';

import { RestoreDealsIcon } from '@/assets/icons';
import useRestore from '../useRestore';

const RestoreDealModal = ({
  open,
  onClose,
  handlePermanantDeleteRetore,
}: any) => {
  const { restoreLoading } = useRestore();
  // console.log(restoreLoading,'restoreLoading');

  return (
    <>
      <AlertModals
        typeImage={<RestoreDealsIcon />}
        message="You are about to restore record"
        type="restore"
        open={open}
        handleClose={onClose}
        handleSubmitBtn={handlePermanantDeleteRetore}
        isLoading={restoreLoading}
      />
    </>
  );
};

export default RestoreDealModal;
