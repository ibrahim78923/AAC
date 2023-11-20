import { AlertModals } from '@/components/AlertModals';
import React from 'react';

const DeleteModalBox = ({ isDeleteModal, handleSubmit }: any) => {
  return (
    <AlertModals
      message="You’re about to delete Contacts. Deleted Contacts can’t be resorted after 90 days."
      type="delete"
      open={isDeleteModal}
      handleClose={isDeleteModal}
      handleSubmit={handleSubmit}
    />
  );
};

export default DeleteModalBox;
