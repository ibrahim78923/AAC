import React from 'react';
import { styles } from './BusinessHour.styles';
import { Box, IconButton, Typography } from '@mui/material';
import { SwitchBtn } from '@/components/SwitchButton';
import { EditBlackIcon } from '@/assets/icons';
import { AIR_CALL_CENTER } from '@/routesConstants/paths';
import { useRouter } from 'next/router';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_CALL_CENTER_SETTING_GENERAL_SETTING_PERMISSIONS } from '@/constants/permission-keys';

const BusinessHour = ({
  handleEnaledBusinessHours,
  isEnabledBusinessHours,
}: any) => {
  const navigate = useRouter();

  return (
    <PermissionsGuard
      permissions={[
        AIR_CALL_CENTER_SETTING_GENERAL_SETTING_PERMISSIONS?.BUSINESS_HOURS_LIST,
      ]}
    >
      <Box sx={styles?.hour}>
        <Box sx={styles?.hourLeft}>
          <Box sx={styles?.hourTitle}>
            <Typography variant="h6">Default Business Hour</Typography>
            <Box sx={styles?.hourBadge}>Default</Box>
          </Box>
          <Box sx={styles?.UTC}>UTC</Box>
        </Box>
        <Box sx={styles?.hourRight}>
          <SwitchBtn
            checked={isEnabledBusinessHours}
            handleSwitchChange={handleEnaledBusinessHours}
          />
          <PermissionsGuard
            permissions={[
              AIR_CALL_CENTER_SETTING_GENERAL_SETTING_PERMISSIONS?.EDIT_BUSINESS_HOURS,
            ]}
          >
            <IconButton
              sx={styles?.editBtn}
              onClick={() =>
                navigate.push(
                  `${
                    AIR_CALL_CENTER.SETTINGS.ADD_BUSINESS_HOURS
                  }?formValues=${encodeURIComponent('Edit')}`,
                )
              }
            >
              <EditBlackIcon />
            </IconButton>
          </PermissionsGuard>
        </Box>
      </Box>
    </PermissionsGuard>
  );
};

export default BusinessHour;
