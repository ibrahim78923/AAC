import React from 'react';
import { styles } from './BusinessHour.styles';
import { Box, IconButton, Typography } from '@mui/material';
import { SwitchBtn } from '@/components/SwitchButton';
import { EditBlackIcon } from '@/assets/icons';

const BusinessHour = () => {
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
        <SwitchBtn />
        <IconButton sx={styles?.editBtn}>
          <EditBlackIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default BusinessHour;
