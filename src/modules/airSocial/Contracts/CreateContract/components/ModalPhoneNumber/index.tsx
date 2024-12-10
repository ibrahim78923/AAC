import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import CommonDialog from '@/components/CommonDialog';
import { styles } from './ModalPhoneNumber.style';
import { FormProvider } from '@/components/ReactHookForm';
import useModalPhoneNumber from './useModalPhoneNumber';
import FieldPhoneNumber from './FieldPhoneNumber';
import FieldVerificationCode from './FieldVerificationCode';

interface ModalPhoneNumberProps {
  open: boolean;
  onClose: () => void;
}

export default function ModalPhoneNumber({
  open,
  onClose,
}: ModalPhoneNumberProps) {
  const {
    activeStep,
    handleNext,
    handleBack,
    methods,
    handleSubmit,
    onSubmit,
    reset,
  } = useModalPhoneNumber();

  const steps = [
    {
      sidebarTitle: 'Update your phone number?',
      description:
        'Air Applecart uses your phone number to allow you to sign documents digitally. Your phone number is required to keep your account safe.',
      contentTitle: 'What is your phone number?',
      subtitle: '',
      field: <FieldPhoneNumber />,
    },
    {
      sidebarTitle: 'Please enter the code we sent you.',
      description:
        'Received codes are time-sensitive. Enter them within the specified timeframe. If expired, press Resend to request a new code.',
      contentTitle: 'Enter Received Code',
      subtitle: 'The code was sent to +444756 983905',
      field: <FieldVerificationCode />,
    },
  ];

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <CommonDialog
      open={open}
      onClose={handleClose}
      cancelText="Cancel"
      okText="Submit"
      width="800px"
      isFooter={false}
    >
      <Box sx={styles?.container}>
        <Box sx={styles?.sidebar}>
          <Box sx={styles?.title}>{steps[activeStep]?.sidebarTitle}</Box>
          <Typography variant="body1" sx={{ mt: '16px' }}>
            {steps[activeStep]?.description}
          </Typography>
        </Box>

        <Box sx={styles?.content}>
          <FormProvider methods={methods}>
            <Box>
              <Box sx={styles?.contentTitle}>
                {steps[activeStep]?.contentTitle}
              </Box>
              <Typography variant="body2" sx={{ mt: '16px' }}>
                {steps[activeStep]?.subtitle}
              </Typography>
              <Box sx={styles?.field}>{steps[activeStep]?.field}</Box>
              {activeStep === 1 && (
                <Box sx={styles?.resendContainer}>
                  <Typography variant="body2">Change phone number</Typography>
                  <Box sx={styles?.resendButton}>Resend</Box>
                </Box>
              )}
            </Box>
            <Box sx={styles?.stepActions}>
              <Button
                onClick={activeStep === 0 ? handleClose : handleBack}
                variant="outlined"
                color="inherit"
                className="small"
              >
                {activeStep === 0 ? 'Cancel' : 'Back'}
              </Button>
              <Button
                onClick={activeStep === 0 ? handleNext : handleSubmit(onSubmit)}
                variant="contained"
                color="primary"
                className="small"
              >
                {activeStep === 0 ? 'Next' : 'Confirm'}
              </Button>
            </Box>
          </FormProvider>
        </Box>
      </Box>
    </CommonDialog>
  );
}
