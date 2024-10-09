import ReportCalendarFilter from '@/components/ReportCalendarFilter';
import { Box, Typography } from '@mui/material';
import { ChartI } from './Chart.interface';
import { TruncateText } from '@/components/TruncateText';

export const Chart = (props: ChartI) => {
  const { allChartComponents, setCalendarFilter, watch } = props;
  const [chartTitle, subFilter, chartType] = watch([
    'chartTitle',
    'subFilter',
    'chartType',
  ]) as [string, boolean, string];
  return (
    <Box border={1} borderColor={'grey.700'} p={1} borderRadius={2}>
      {chartType ? (
        <Box p={1}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <TruncateText text={chartTitle} />
            {subFilter && (
              <ReportCalendarFilter setCalendarFilter={setCalendarFilter} />
            )}
          </Box>
          {allChartComponents[chartType]}
        </Box>
      ) : (
        <Box p={10}>
          <Typography
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            variant="h5"
          >
            Chart
          </Typography>
        </Box>
      )}
    </Box>
  );
};
