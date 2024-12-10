import React from 'react';
import CommonModal from '@/components/CommonModal';
import { Typography } from '@mui/material';

interface ModalConfirmationSignDocProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function ModalConfirmationSignDoc({
  open,
  onClose,
  onSubmit,
}: ModalConfirmationSignDocProps) {
  return (
    <CommonModal
      title="Sign and send the document"
      open={open}
      handleClose={onClose}
      handleCancel={onClose}
      handleSubmit={onSubmit}
      okText={'Sign & Send'}
      cancelText="Cancel"
      footer={true}
      width={648}
    >
      <Typography variant="body1">
        The document will be signed by you and sent to the subsequent signee (if
        any). By signing this document, you agree to its terms and understand
        that i will be legally binding.
      </Typography>
    </CommonModal>
  );
}
