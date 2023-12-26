import React from 'react';

import { AlertModals } from '@/components/AlertModals';

const DeleteModal = ({ isDeleteCompany, setIsDeleteCompany }: any) => {
  return (
    <>
      <AlertModals
        message={
          "You're about to delete a record .Deleted record can't be restored after 90days"
        }
        type={'delete'}
        submitBtnText="OK, Delete"
        open={isDeleteCompany}
        handleClose={() => setIsDeleteCompany(false)}
        handleSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
};

export default DeleteModal;
