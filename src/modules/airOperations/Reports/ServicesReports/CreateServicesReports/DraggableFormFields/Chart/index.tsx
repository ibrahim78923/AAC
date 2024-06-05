import { Box, Typography } from '@mui/material';
import { useChart } from './useChart';

export const Chart = (props: any) => {
  const { chartType, chartComponent } = props;
  const { theme } = useChart(props);

  return (
    <Box
      border={`1px solid ${theme?.palette?.grey[700]}`}
      p={1}
      borderRadius={2}
    >
      {chartType ? (
        <>{chartComponent}</>
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
  );
};
