import React from 'react';

import { AlertModals } from '@/components/AlertModals';

const RestoreDealModal = ({ open, onClose, handlePermanantDelete }: any) => {
  return (
    <>
      <AlertModals
        message="You are about to restore a record"
        type="info"
        open={open}
        handleClose={onClose}
        handleSubmit={handlePermanantDelete}
      />
    </>
  );
};

export default RestoreDealModal;
