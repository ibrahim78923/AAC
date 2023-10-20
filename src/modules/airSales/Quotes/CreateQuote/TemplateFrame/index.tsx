import React from 'react';
import { Box } from '@mui/material';
import { FrameRefreshIcon } from '@/assets/icons/index';
import { styles } from './TemplateFrame.style';

const TemplateFrame = ({ children }: any) => {
  return (
    <Box sx={styles.frame}>
      <Box sx={styles.header}>
        <Box sx={styles.headerText}>
          airapplecart.com{' '}
          <Box sx={{ display: 'inline-flex', ml: '14px' }}>
            <FrameRefreshIcon />
          </Box>
        </Box>
        <Box sx={styles.dots}>
          <Box component={'span'}></Box>
          <Box component={'span'}></Box>
          <Box component={'span'}></Box>
        </Box>
      </Box>
      <Box sx={styles.body}>{children}</Box>
    </Box>
  );
};

export default TemplateFrame;
