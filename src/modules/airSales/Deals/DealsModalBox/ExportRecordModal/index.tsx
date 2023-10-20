import React from 'react';

import { AlertModals } from '@/components/AlertModals';

const ExportRecordModal = ({ open, onClose, handleExportRecord }: any) => {
  return (
    <AlertModals
      message="You are about to restore a record"
      type="info"
      open={open}
      handleClose={onClose}
      handleSubmit={handleExportRecord}
    />
  );
};

export default ExportRecordModal;
