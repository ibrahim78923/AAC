import React from 'react';
import { styles } from './BusinessHour.styles';
import { Box, IconButton, Typography } from '@mui/material';
import { SwitchBtn } from '@/components/SwitchButton';
import { EditBlackIcon } from '@/assets/icons';
import { AIR_CALL_CENTER } from '@/routesConstants/paths';
import { useRouter } from 'next/router';

const BusinessHour = ({
  handleEnaledBusinessHours,
  isEnabledBusinessHours,
}: any) => {
  const navigate = useRouter();

  return (
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
      </Box>
    </Box>
  );
};

export default BusinessHour;
