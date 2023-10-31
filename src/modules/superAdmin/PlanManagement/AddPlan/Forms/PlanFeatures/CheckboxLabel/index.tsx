import React from 'react';

import { Box, Typography } from '@mui/material';

const CheckboxLabel = ({ name, desc }: { name: string; desc: string }) => {
  return (
    <Box>
      <Typography>{name}</Typography>
      <Typography variant="body3">{desc}</Typography>
    </Box>
  );
};

export default CheckboxLabel;
