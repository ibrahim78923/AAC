import { CustomChart } from '@/components/Chart';
import { useTicketsReportChart } from './useTicketsReportChart';
import { Box, Typography } from '@mui/material';

export const TicketsReportChart = () => {
  const { options, seriesData, theme } = useTicketsReportChart();

  return (
    <Box
      p={2}
      border={`.1rem solid ${theme?.palette?.grey[700]}`}
      borderRadius={3}
    >
      <Typography variant="h5">Tickets Analytic Report</Typography>
      <CustomChart
        options={options}
        series={seriesData}
        type={'bar'}
        height={348}
      />
    </Box>
  );
};
