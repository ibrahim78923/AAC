import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { styles } from './CustomBox.style';
import { CustomBoxI } from './CustomBox.interface';

export const CustomBox = ({ label, value, changeStatusColor }: CustomBoxI) => {
  const theme = useTheme();
  let color: string | any;
  switch (value) {
    case 'inprogress':
      color = theme?.palette.warning.main;
      break;
    case 'pending':
      color = theme?.palette.error.main;
      break;
    case 'completed':
      color = theme?.palette.success.main;
      break;
    default:
      color = '#';
      break;
  }
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      mt={'8px'}
    >
      <Typography sx={{ ...styles.cardSubHead(theme), color: '#6B7280' }}>
        {label}
      </Typography>
      <Typography
        sx={{
          ...styles?.cardSubHead2(theme),
          color: changeStatusColor && color,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};
