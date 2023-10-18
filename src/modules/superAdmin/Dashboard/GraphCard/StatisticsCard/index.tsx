import React from 'react';

import dynamic from 'next/dynamic';

import { Box, Typography } from '@mui/material';

import { styles } from './StatisticsCard.style';

import useStatisticsCard from './useStatisticsCard';

const StatisticsCard = () => {
  const { series, options, theme } = useStatisticsCard();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  return (
    <>
      <Box sx={styles.staticCardStyle}>
        <Typography
          variant="body2"
          sx={{ color: `${theme?.palette?.custom.dark_blue}`, fontWeight: 600 }}
        >
          Plan Statistics
        </Typography>
        <Box>
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={450}
          />
        </Box>
      </Box>
    </>
  );
};

export default StatisticsCard;
