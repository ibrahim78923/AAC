import React, { FC } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from '@mui/material';
import { CloseModalIcon } from '@/assets/icons';
import { OTPVerificationI } from './OTPVerification.interface';
import { styles } from './OTPVerification.style';

const OTPVerification: FC<OTPVerificationI> = ({ open, onClose, onSubmit }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={styles?.dialog}
    >
      <DialogTitle>
        OTP Verification
        <IconButton onClick={onClose}>
          <CloseModalIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: '12px 24px 24px' }}>
        <Box sx={styles.regNumText}>
          You are one step away for your first broadcast{' '}
        </Box>
        <Box sx={{ mt: '20px' }}>
          <Typography sx={{ mb: '6px' }} variant="body2">
            Enter OTP
          </Typography>
          <TextField
            variant="outlined"
            type="number"
            fullWidth
            placeholder="356325"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button className="small" variant="contained" onClick={onSubmit}>
          Verification
        </Button>
      </DialogActions>
      <Box sx={styles.bottom}>
        Haven&apos;t received security PIN? <Box component={'span'}>Resend</Box>
      </Box>
    </Dialog>
  );
};

export default OTPVerification;
