import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { FrameRefreshIcon } from '@/assets/icons/index';
import { styles } from './TemplateFrame.style';

const TemplateFrame = ({ children }: any) => {
  const theme = useTheme();
  return (
    <Box sx={styles?.frame(theme)}>
      <Box sx={styles?.header(theme)}>
        <Box sx={styles?.headerText(theme)}>
          <Typography>airapplecart.com</Typography>
          <Box sx={{ display: 'flex', ml: '14px' }}>
            <FrameRefreshIcon />
          </Box>
        </Box>
        <Box sx={styles?.dots}>
          <Box component={'span'}></Box>
          <Box component={'span'}></Box>
          <Box component={'span'}></Box>
        </Box>
      </Box>
      <Box sx={styles?.body}>{children}</Box>
    </Box>
  );
};

export default TemplateFrame;
