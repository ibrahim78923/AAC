import React from 'react';
import { Box } from '@mui/material';
import { styles } from './PageHeader.styles';
import { CompanyLogoIcon } from '@/assets/icons';

export default function PageHeader() {
  return (
    <Box sx={styles?.root}>
      <Box sx={styles?.logo}>
        <CompanyLogoIcon />
      </Box>
    </Box>
  );
}
