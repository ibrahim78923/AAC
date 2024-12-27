import React, { FC } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { CloseModalIcon } from '@/assets/icons';
import { AddRegNumberI } from './AddRegNumber.interface';
import { styles } from './AddRegNumber.style';
import PhoneNumberInput from '@/components/PhoneNumberInput';
import { LoadingButton } from '@mui/lab';
import Link from 'next/link';

const AddRegNumber: FC<AddRegNumberI> = ({
  open,
  onClose,
  onSubmit,
  onPhoneChange,
  phoneValue,
  isPhoneValid,
  isLoading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={styles?.dialog}
    >
      <DialogTitle>
        Add Registration Number
        <IconButton onClick={onClose}>
          <CloseModalIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: '12px 24px 24px' }}>
        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            mt: 1,
            mb: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: '600', fontSize: '16px' }}
          >
            Integrate your Twilio Account
          </Typography>
          <Link href="./sms-marketing/connect-account">
            <Button variant="contained" color="primary">
              Connect
            </Button>
          </Link>
        </Box>

        <Box sx={styles?.regNumText}>
          Connect phone number to get started SMS broadcast
        </Box>
        <Box sx={{ mt: '20px' }}>
          <PhoneNumberInput
            value={phoneValue}
            onChange={onPhoneChange}
            valid={isPhoneValid}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          className="small"
          variant="outlined"
          onClick={onClose}
          sx={styles?.btnOutlined}
        >
          Cancel
        </Button>
        <LoadingButton
          className="small"
          variant="contained"
          onClick={onSubmit}
          loading={isLoading}
        >
          Continue
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddRegNumber;
