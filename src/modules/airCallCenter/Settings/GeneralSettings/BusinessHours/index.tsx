import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@mui/material';
import useBusinessHours from './useBusinessHours';
import { styles } from './BusinessHours.styles';
import PlusShared from '@/assets/icons/shared/plus-shared';
import BusinessHour from './BusinessHour';
import { AIR_CALL_CENTER } from '@/routesConstants/paths';
import { AlertModals } from '@/components/AlertModals';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';
import { AIR_CALL_CENTER_SETTING_GENERAL_SETTING_PERMISSIONS } from '@/constants/permission-keys';

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
      <PermissionsGuard
        permissions={Permissions?.AIR_CALL_CENTER_SETTING_GENERAL_SETTING}
      >
        <Box sx={styles?.pageHeader}>
          <Box sx={styles?.heading}>
            <Typography variant="h3">Business Hours</Typography>
            <Typography sx={styles.subHeading}>
              Business hours give you more control over SLAs in your helpdesk,
              and when a ticket is due.
            </Typography>
            <Box sx={styles.learnMore}>Learn More</Box>
          </Box>
          <Box sx={styles?.paheHeaderActions}>
            <PermissionsGuard
              permissions={[
                AIR_CALL_CENTER_SETTING_GENERAL_SETTING_PERMISSIONS?.ADD_BUSINESS_HOURS,
              ]}
            >
              <Button
                variant="contained"
                sx={{ height: '36px', fontWeight: '500' }}
                startIcon={<PlusShared />}
                onClick={() =>
                  navigate.push(
                    `${AIR_CALL_CENTER?.SETTINGS
                      ?.ADD_BUSINESS_HOURS}?formValues=${encodeURIComponent(
                      'Add',
                    )}`,
                  )
                }
              >
                Add Business Hours
              </Button>
            </PermissionsGuard>
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
      </PermissionsGuard>
    </>
  );
};

export default BusinessHours;
