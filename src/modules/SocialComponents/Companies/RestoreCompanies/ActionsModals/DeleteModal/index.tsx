import React from 'react';

import { AlertModals } from '@/components/AlertModals';

import { AlertModalDeleteIcon } from '@/assets/icons';

const DeleteModal = ({ isRestoreDelete, setIsRestoreDelete }: any) => {
  return (
    <>
      <AlertModals
        typeImage={<AlertModalDeleteIcon />}
        message={
          "You're about to delete a Record Permanently. This action can't ne undo?"
        }
        type="Permanantly Delete"
        open={isRestoreDelete}
        cancelBtnText="Cancel"
        submitBtnText="Delete"
        handleClose={() => setIsRestoreDelete(false)}
        handleSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
};

export default DeleteModal;
