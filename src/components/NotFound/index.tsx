import React from 'react';
import { Typography, Box } from '@mui/material';
import NotFoundPropsI from './NotFound.interface';
import { styles } from './NotFound.style.ts';

const NotFound: React.FC<NotFoundPropsI> = ({ message }) => {
  return (
    <Box sx={styles?.CardNotFound}>
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
};

export default NotFound;
