import React, { useState } from 'react';
import { AlertModals } from '@/components/AlertModals';

const DeleteModal = () => {
  const [handleOpen, setHandleOpen] = useState(false);
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
