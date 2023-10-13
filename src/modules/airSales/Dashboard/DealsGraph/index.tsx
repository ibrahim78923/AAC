import dynamic from 'next/dynamic';
import { options, series } from './DealsGraph.data';
import { Box, Card, Typography, useTheme } from '@mui/material';

const DealsGraph = () => {
  const theme = useTheme();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });
  return (
    <Card>
      <Box p={1} sx={{ backgroundColor: theme.palette.grey[700] }}>
        <Typography variant="h6">Deals created vs Closed deals</Typography>
        <Typography variant="body3">Date range: 6 months</Typography>
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
