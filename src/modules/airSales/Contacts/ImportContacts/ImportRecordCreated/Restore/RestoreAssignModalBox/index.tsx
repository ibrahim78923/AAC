import { AlertModals } from '@/components/AlertModals';

import { RestoreDealsIcon } from '@/assets/icons';

const RestoreAssignModalBox = ({ open, onClose, handleAssignModal }: any) => {
  return (
    <>
      <AlertModals
        typeImage={<RestoreDealsIcon />}
        message="You are about to restore a Activity."
        type="Restore Activity"
        open={open}
        handleClose={onClose}
        handleSubmit={() => {
          handleAssignModal;
        }}
      />
    </>
  );
};

export default RestoreAssignModalBox;
