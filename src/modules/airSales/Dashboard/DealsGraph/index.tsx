import dynamic from 'next/dynamic';

import { Box, Card, Typography, useTheme } from '@mui/material';

import { options, series } from './DealsGraph.data';

const DealsGraph = () => {
  const theme = useTheme();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });
  return (
    <Card>
      <Box p={1.6} sx={{ backgroundColor: theme?.palette?.grey[700] }}>
        <Typography variant="h6">Deals created vs Closed deals</Typography>
        <Typography variant="body3" sx={{ color: theme?.palette?.grey[900] }}>
          Date range: 6 months
        </Typography>
      </Box>
      <Box>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={300}
        />
      </Box>
    </Card>
  );
};
export default DealsGraph;
