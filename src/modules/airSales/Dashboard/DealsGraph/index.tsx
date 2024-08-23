import dynamic from 'next/dynamic';

import { Box, Card, Typography, useTheme } from '@mui/material';

import { options, series } from './DealsGraph.data';
import { useGetDealsCreatedQuery } from '@/services/airSales/dashboard';

const DealsGraph = () => {
  const theme = useTheme();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  const { data: dealsData } = useGetDealsCreatedQuery({});

  return (
    <Card>
      <Box p={1.6} sx={{ backgroundColor: theme?.palette?.grey[700] }}>
        <Typography variant="h5">Deals created vs Closed deals</Typography>
        <Typography variant="body3" sx={{ color: theme?.palette?.grey[900] }}>
          Date range: 6 months
        </Typography>
      </Box>
      <Box>
        <ReactApexChart
          options={options(dealsData?.data)}
          series={series(dealsData?.data)}
          type="bar"
          height={300}
        />
      </Box>
    </Card>
  );
};
export default DealsGraph;
