import React from 'react';

import { AlertModals } from '@/components/AlertModals';

const DealsModalBox = ({ open, onClose, handleSubmit }: any) => {
  return (
    <>
      <AlertModals
        message=""
        type="delete"
        open={open}
        handleClose={onClose}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default DealsModalBox;
