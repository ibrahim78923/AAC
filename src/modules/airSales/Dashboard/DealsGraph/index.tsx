import dynamic from 'next/dynamic';
import { options, series } from './DealsGraph.data';
import { Box, Card, Typography } from '@mui/material';

const DealsGraph = () => {
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });
  return (
    <Card>
      <Box p={1}>
        <Typography variant="h6">Deals created vs Closed deals</Typography>
        <Typography variant="body3">Date range: 6 months</Typography>
      </Box>
      <Box>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </Box>
    </Card>
  );
};
export default DealsGraph;
