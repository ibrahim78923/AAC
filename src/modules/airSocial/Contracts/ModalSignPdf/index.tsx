import React, { useState } from 'react';
import CommonDialog from '@/components/CommonDialog';
import { Box, Typography } from '@mui/material';
import CardSignature from './CardSignature';

interface ModalSignPdfProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function ModalSignPdf({
  open,
  onClose,
  onSubmit,
}: ModalSignPdfProps) {
  const [selectedSignatureMethod, setSelectedSignatureMethod] =
    useState('drawSign');

  return (
    <CommonDialog
      title={
        <Box>
          <Box>Sign a PDF</Box>
          <Typography
            variant="body2"
            sx={{ fontSize: '12px', lineHeight: '1.25', mt: '4px' }}
          >
            Choose Signature method
          </Typography>
        </Box>
      }
      open={open}
      onClose={onClose}
      width="1062px"
      okText="Continue"
      cancelText="Cancel"
      onSubmit={onSubmit}
    >
      <CardSignature
        value={selectedSignatureMethod}
        onChange={(value) => setSelectedSignatureMethod(value)}
      />
    </CommonDialog>
  );
}
