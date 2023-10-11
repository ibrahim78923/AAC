import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './StatisticsCard.style';

const StatisticsCard = () => {
  return (
    <>
      <Box sx={styles.staticCardStyle}>
        <Typography variant="body2" sx={{ color: '#030229', fontWeight: 600 }}>
          Plan Statistics
        </Typography>
      </Box>
    </>
  );
};

export default StatisticsCard;
