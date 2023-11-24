import { CustomChart } from '@/components/Chart';
import {
  radialBarChartData,
  radialBarChartDataOptions,
} from './TicketsByPriorityRadialChart.data';
import { CardWrapper } from '../CardWrapper';
import { Box, Typography } from '@mui/material';

export const TicketsByPriorityRadialChart = () => {
  return (
    <>
      <CardWrapper>
        <Box marginLeft={2}>
          <Box>
            <Typography variant="h4">Tickets based on Priority</Typography>
          </Box>
        </Box>
        <Box marginTop={2} marginBottom={2}>
          <CustomChart
            options={radialBarChartDataOptions}
            series={radialBarChartData}
            type="radialBar"
            height={328}
          />
        </Box>
      </CardWrapper>
    </>
  );
};
