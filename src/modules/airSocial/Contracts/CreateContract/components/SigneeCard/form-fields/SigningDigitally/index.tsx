import React from 'react';
import { Box } from '@mui/material';
import { styles } from './SigningDigitally.style';
import { IconCpu } from '@/assets/icons';

export default function SigningDigitally() {
  return (
    <Box sx={styles?.cpuCard}>
      <Box sx={styles?.cupCardBody}>
        <Box sx={styles?.cupCardBodyContent}>
          <IconCpu />
          <Box>Signing digitally</Box>
        </Box>
      </Box>
      <Box sx={styles?.cpuCardStripe} />
    </Box>
  );
}
