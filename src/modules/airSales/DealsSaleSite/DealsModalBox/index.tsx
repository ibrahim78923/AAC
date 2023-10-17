import React from 'react';

import { AlertModals } from '@/components/AlertModals';
import UseDeleteModal from './useDealsModalBox';

const DeleteModal = () => {
  const { handleOpen, setHandleOpen } = UseDeleteModal();

  return (
    <>
      <AlertModals
        message=""
        type="delete"
        open={!handleOpen}
        handleClose={() => {
          setHandleOpen(false);
        }}
        handleSubmit={() => {
          setHandleOpen(true);
        }}
      />
    </>
  );
};

export default DeleteModal;
