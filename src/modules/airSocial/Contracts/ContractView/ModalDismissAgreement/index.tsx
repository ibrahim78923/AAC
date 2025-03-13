import React from 'react';
import { Box, TextField } from '@mui/material';
import CommonDialog from '@/components/CommonDialog';
import CustomLabel from '@/components/CustomLabel';

interface ModalDismissAgreementProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  signatureMessage: string;
  setSignatureMessage: (message: string) => void;
  isLoading?: boolean;
}

export default function ModalDismissAgreement({
  open,
  onClose,
  onSubmit,
  signatureMessage,
  setSignatureMessage,
  isLoading,
}: ModalDismissAgreementProps) {
  return (
    <CommonDialog
      title={'Dismiss agreement'}
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      okText={'Dismiss agreement'}
      okDisabled={signatureMessage === ''}
      cancelText="Cancel"
      width="700px"
      closeIcon={true}
      isLoading={isLoading}
    >
      <Box>Why are you rejecting the contract?</Box>
      <Box sx={{ mt: '24px' }}>
        <CustomLabel label={'Rejection reason'} required />
        <TextField
          id="signatureMessage"
          value={signatureMessage}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSignatureMessage(event.target.value);
          }}
          multiline
          rows={4}
          fullWidth
        />
      </Box>
    </CommonDialog>
  );
}
