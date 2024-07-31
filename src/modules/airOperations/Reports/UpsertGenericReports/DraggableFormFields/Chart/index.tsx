import ReportCalendarFilter from '@/components/ReportCalendarFilter';
import { Box, Typography } from '@mui/material';

export const Chart = (props: any) => {
  const { allChartComponents, setCalendarFilter, watch } = props;
  const chartTitle = watch('chartTitle');
  const subFilter = watch('subFilter');
  const chartType = watch('chartType');
  return (
    <>
      <Box border={1} borderColor={'grey.700'} p={1} borderRadius={2}>
        {chartType ? (
          <Box p={1}>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="h6">{chartTitle}</Typography>
              {subFilter && (
                <ReportCalendarFilter setCalendarFilter={setCalendarFilter} />
              )}
            </Box>
            {allChartComponents[chartType]}
          </Box>
        ) : (
          <>
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
          </>
        )}
      </Box>
    </>
  );
};
