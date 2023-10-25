import { Box, Typography } from '@mui/material';
import React from 'react';

const UserRemove = () => {
  return (
    <Box sx={{ width: { sm: '484px', xs: '100%' } }}>
      <Typography sx={{ mt: 2 }}>
        Are you sure want to Deallocate Contract for this user?
      </Typography>
    </Box>
  );
};

export default UserRemove;
