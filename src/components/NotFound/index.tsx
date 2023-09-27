import React from 'react';
import { Typography, Box } from '@mui/material';

const style = {
  CardNotFound: {
    backgroundColor: '#E57373',
    color: '#fff',
    padding: '10px',
    borderRadius: '12px',
    width: 'fit-content',
    marginTop: '10px',
  },
};

interface NotFoundProps {
  type: string;
  message: string;
}

const NotFound: React.FC<NotFoundProps> = ({ message }) => {
  return (
    <Box sx={style?.CardNotFound}>
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
};

export default NotFound;
