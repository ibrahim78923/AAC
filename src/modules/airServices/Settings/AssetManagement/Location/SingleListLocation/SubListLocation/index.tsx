import { Box, Divider, Typography, useTheme } from '@mui/material';
import React from 'react';

export const SubListLocation = ({ country }: any) => {
  const theme: any = useTheme();
  return (
    <Box
      display={'flex'}
      justifyContent={'start'}
      flexWrap={'wrap'}
      border={`.1rem solid ${theme?.palette?.grey[700]}`}
      bgcolor={theme?.palette?.grey[100]}
      padding={1}
      mt={1}
      sx={{ cursor: 'pointer' }}
    >
      <Typography color={'primary'}>L</Typography>
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          margin: '0 2rem',
          border: `.1rem solid ${theme?.palette?.grey[700]}`,
          backgroundColor: 'transparent',
        }}
      />
      <Typography>{country}</Typography>
    </Box>
  );
};
