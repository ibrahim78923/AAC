import React from 'react';
import { Box, Theme, Typography, useTheme } from '@mui/material';

const EventCards = () => {
  const theme = useTheme<Theme>();
  return (
    <Box
      sx={{
        border: `1px solid ${theme?.palette?.grey[700]}`,
        borderRadius: '8px',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        variant="body2"
        sx={{ color: `${theme?.palette?.grey[800]}`, fontWeight: 600 }}
      >
        Event & Notifications
      </Typography>
    </Box>
  );
};

export default EventCards;
