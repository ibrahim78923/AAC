import React from 'react';
import { Box } from '@mui/material';
import { styles } from './PageHeader.styles';
import { LogoAvatar } from '@/components/Avatars/LogoAvatar';

export default function PageHeader() {
  return (
    <Box sx={styles?.root}>
      <Box sx={styles?.logo}>
        <LogoAvatar />
      </Box>
    </Box>
  );
}
