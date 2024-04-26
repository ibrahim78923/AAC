import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@mui/material';
import useBusinessHours from './useBusinessHours';
import { styles } from './BusinessHours.styles';
import PlusShared from '@/assets/icons/shared/plus-shared';
import BusinessHour from './BusinessHour';
import { AIR_CALL_CENTER } from '@/routesConstants/paths';
import { AlertModals } from '@/components/AlertModals';

const BusinessHours = () => {
  const {
    isEnabledBusinessHours,
    handleEnabledBusinessHours,
    openAlertModal,
    handleCloseAlertModal,
    handleDisabledBusinessHours,
  } = useBusinessHours();
  const navigate = useRouter();

  return (
    <>
      <Box sx={styles?.pageHeader}>
        <Box sx={styles?.heading}>
          <Typography variant="h3">Business Hours</Typography>
          <Typography sx={styles.subHeading}>
            Business hours give you more control over SLAs in your helpdesk, and
            when a ticket is due.
          </Typography>
          <Box sx={styles.learnMore}>Learn More</Box>
        </Box>
        <Box sx={styles?.paheHeaderActions}>
          <Button
            variant="contained"
            sx={{ height: '36px', fontWeight: '500' }}
            startIcon={<PlusShared />}
            onClick={() =>
              navigate.push(AIR_CALL_CENTER?.SETTINGS?.ADD_BUSINESS_HOURS)
            }
          >
            Add Business Hours
          </Button>
        </Box>
      </Box>
      <Box sx={styles?.hoursList}>
        <BusinessHour
          isEnabledBusinessHours={isEnabledBusinessHours}
          handleEnaledBusinessHours={handleEnabledBusinessHours}
        />
      </Box>

      <AlertModals
        type="delete"
        open={openAlertModal}
        handleClose={handleCloseAlertModal}
        handleSubmitBtn={handleDisabledBusinessHours}
        message="Are you sure you want to disable it?"
      />
    </>
  );
};

export default BusinessHours;
