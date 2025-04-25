import React from 'react';
import { Box, TextField } from '@mui/material';
import CommonDialog from '@/components/CommonDialog';
import CustomLabel from '@/components/CustomLabel';

interface ModalRequestChangedProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  signatureMessage: string;
  setSignatureMessage: (message: string) => void;
  isLoading?: boolean;
}

export default function ModalRequestChanged({
  open,
  onClose,
  onSubmit,
  signatureMessage,
  setSignatureMessage,
  isLoading,
}: ModalRequestChangedProps) {
  return (
    <CommonDialog
      title={'Request contract change'}
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      okText={'Send request'}
      okDisabled={signatureMessage === ''}
      cancelText="Cancel"
      width="700px"
      closeIcon={true}
      isLoading={isLoading}
    >
      <Box>Write down the things that need to be changed in the contract.</Box>
      <Box sx={{ mt: '24px' }}>
        <CustomLabel label={'What needs to be changed?'} required />
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
