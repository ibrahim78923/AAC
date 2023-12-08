import dynamic from 'next/dynamic';
import { Box, Typography, useTheme } from '@mui/material';

import useProductWiseGraph from './useProductWiseGraph';

import { styles } from './ProductWiseGraph.style';

const ProductWiseGrpah = () => {
  const { series, options, emailReviewSeries } = useProductWiseGraph();
  const theme = useTheme();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  return (
    <>
      <Box sx={styles?.productWiseGraph}>
        <Typography
          sx={{
            color: `${theme?.palette?.custom?.dark_blue}`,
            fontWeight: 600,
            fontSize: '18px',
          }}
        >
          Report
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
      <Box mt={2} sx={styles?.productWiseGraph} className="_custom">
        <Typography
          sx={{
            color: `${theme?.palette?.custom.dark_blue}`,
            fontWeight: 600,
            fontSize: '18px',
          }}
        >
          Email Overview
        </Typography>
        <Box height="350px">
          <ReactApexChart
            options={{
              chart: {
                zoom: {
                  enabled: false,
                },
              },
              markers: {
                strokeWidth: 20,
                shape: 'circle',
                height: 10,
                width: 10,
              },
              dataLabels: {
                enabled: true,
                distributed: true,
                style: {
                  borderRadius: '50%',
                  height: '20px',
                  width: '20px',
                },
                background: {
                  enabled: true,
                  borderColor: 'none',
                  height: '30px',
                  width: '30px',
                  borderRadius: '50%',
                },
              },
              stroke: { curve: 'smooth' },
              grid: {
                row: {
                  colors: ['transparent'],
                },
              },
            }}
            series={emailReviewSeries}
            type="line"
            height={350}
          />
        </Box>
      </Box>
    </>
  );
};

export default ProductWiseGrpah;
