import { CustomChart } from '@/components/Chart';
import {
  barChartData,
  barChartDataOptions,
} from './TicketsByStatusBarChart.data';
import { Box, Typography, useTheme } from '@mui/material';
import { CardWrapper } from '../CardWrapper';

export const TicketsByStatusBarChart = () => {
  const theme = useTheme();
  return (
    <>
      <CardWrapper>
        <Box marginLeft={2}>
          <Box marginRight={3}>
            <Typography variant="h4">Tickets based on Status</Typography>
            <Typography variant="body1" color="grey.700">
              Date Range: 6 months
            </Typography>
          </Box>
        </Box>
        <Box marginTop={2} marginBottom={2}>
          <CustomChart
            options={barChartDataOptions(theme)}
            series={barChartData}
            type="bar"
            height={280}
          />
        </Box>
      </CardWrapper>
    </>
  );
};
