import { Box, Typography } from '@mui/material';
import React from 'react';

const CheckboxLabel = ({ name, desc }: any) => {
  return (
    <Box>
      <Typography>{name}</Typography>
      <Typography variant="body3">{desc}</Typography>
    </Box>
  );
};

export default CheckboxLabel;
