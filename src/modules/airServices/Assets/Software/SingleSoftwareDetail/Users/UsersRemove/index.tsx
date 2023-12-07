import { Box, Typography } from '@mui/material';
import React from 'react';

const UsersRemove = () => {
  return (
    <Box sx={{ width: { sm: '484px', xs: '100%' } }}>
      <Typography sx={{ mt: 2 }}>
        Are you sure want to Remove this user?
      </Typography>
    </Box>
  );
};

export default UsersRemove;
