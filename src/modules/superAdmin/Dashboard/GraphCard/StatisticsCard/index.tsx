import React from 'react';
import { Box, Typography } from '@mui/material';

const StatisticsCard = () => {
  return (
    <>
      <Box
        sx={{
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          background: '#ffff',
          padding: '1rem',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body2" sx={{ color: '#030229', fontWeight: 600 }}>
          Plan Statistics
        </Typography>
      </Box>
    </>
  );
};

export default StatisticsCard;
