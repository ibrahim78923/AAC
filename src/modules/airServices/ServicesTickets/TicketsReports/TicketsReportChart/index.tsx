import { CustomChart } from '@/components/Chart';
import { useTicketsReportChart } from './useTicketsReportChart';
import { Box, Typography } from '@mui/material';

export const TicketsReportChart = () => {
  const { options, seriesData } = useTicketsReportChart();

  return (
    <Box
      boxShadow={1}
      border={'1px solid'}
      borderColor={'custom.off_white_one'}
      borderRadius={2}
      px={2}
      py={3}
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
