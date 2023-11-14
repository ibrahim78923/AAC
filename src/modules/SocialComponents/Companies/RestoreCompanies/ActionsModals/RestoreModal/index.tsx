import React from 'react';

import { AlertModals } from '@/components/AlertModals';

import { AssignCommonIcon } from '@/assets/icons';

const RestoreModal = ({ isRestoreItem, setIsRestoreItem }: any) => {
  return (
    <>
      <AlertModals
        typeImage={<AssignCommonIcon />}
        message="You are about to restore a record."
        type="Restore Company"
        open={isRestoreItem}
        cancelBtnText="Cancel"
        submitBtnText="Restore"
        handleClose={() => setIsRestoreItem(false)}
        handleSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
};

export default RestoreModal;
