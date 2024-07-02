import React, { FC } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { CloseModalIcon } from '@/assets/icons';
import { AddRegNumberI } from './AddRegNumber.interface';
import { styles } from './AddRegNumber.style';
import PhoneNumberInput from '@/components/PhoneNumberInput';
import { LoadingButton } from '@mui/lab';

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
        <Box sx={styles?.regNumText}>
          Register phone number to get started WhatsApp broadcast
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
