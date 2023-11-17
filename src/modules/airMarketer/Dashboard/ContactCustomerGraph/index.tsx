import dynamic from 'next/dynamic';

import { Box, Card, Typography, useTheme } from '@mui/material';

import { options, series } from './ContactCustomerGraph.data';

const ContactCustomerGraph = () => {
  const theme = useTheme();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });
  return (
    <Card>
      <Box p={1.6} sx={{ backgroundColor: theme?.palette?.grey[700] }}>
        <Typography variant="h6">New contact, and customer by day</Typography>
        <Typography variant="body3" sx={{ color: theme?.palette?.grey[900] }}>
          Date range: In last 30 dayss
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
export default ContactCustomerGraph;
