import dynamic from 'next/dynamic';
import { Box, Button, Card, Typography } from '@mui/material';
import { options, series } from './ClicksChart.data';
import { style } from '../../Analyze.style';
import useAnalyze from '../../useAnalyze';

const ClicksChart = () => {
  const { theme } = useAnalyze();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  return (
    <Card sx={{ p: '24px' }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Typography
          variant="h5"
          sx={{ color: `${theme?.palette?.slateBlue?.main}` }}
        >
          Clicks
        </Typography>
        <Button
          variant="outlined"
          className="small"
          sx={{
            border: 'none',
            '&:hover': {
              border: 'none',
            },
          }}
        >
          Save
        </Button>
      </Box>
      <Box height="350px" sx={style?.chartTitle}>
        <ReactApexChart
          options={options(theme?.palette)}
          series={series}
          type="bar"
          height={350}
        />
      </Box>
      <Typography
        variant="body2"
        fontWeight={600}
        color={theme?.palette?.slateBlue?.main}
        textAlign="center"
      >
        Session Date
      </Typography>
    </Card>
  );
};

export default ClicksChart;
