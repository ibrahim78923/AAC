import React from 'react';

import dynamic from 'next/dynamic';

import { Box, Typography } from '@mui/material';

import { styles } from './ProductWiseGraph.style';
import { options, series } from './ProductWiseGraph.data';
import { useTheme } from '@mui/material/styles';

const ProductWiseGrpah = () => {
  const theme = useTheme();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  return (
    <Box sx={styles?.productWiseGraph}>
      <Typography
        sx={{
          color: `${theme?.palette?.custom?.dark_blue}`,
          fontWeight: 600,
          fontSize: '18px',
        }}
      >
        Product wise user stats
      </Typography>
      <Box height="350px">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </Box>
    </Box>
  );
};

export default ProductWiseGrpah;
