import React from 'react';
import { Box, Theme, Typography, useTheme } from '@mui/material';

const PlanList = () => {
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
      <Box sx={{ display: 'flex' }}>
        <Typography variant="body2" sx={{ color: '#030229', fontWeight: 600 }}>
          Plan list
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: `${theme?.palette?.primary.main}`,
            fontWeight: 600,
          }}
        >
          View All
        </Typography>
      </Box>
    </Box>
  );
};

export default PlanList;
