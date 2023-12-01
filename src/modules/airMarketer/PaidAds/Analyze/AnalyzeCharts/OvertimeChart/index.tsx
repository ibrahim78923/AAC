import dynamic from 'next/dynamic';
import { Box, Button, Card, Typography } from '@mui/material';
import { options, series } from './OvertimeChart.data';
import { style } from '../../Analyze.style';
import useAnalyze from '../../useAnalyze';

const OvertimeChart = () => {
  const { theme } = useAnalyze();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  return (
    <Card sx={{ p: '24px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            color: `${theme?.palette?.slateBlue?.main}`,
            fontWeight: 600,
            fontSize: '18px',
          }}
        >
          Ad spend over time
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
          options={options}
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
        Session Data
      </Typography>
    </Card>
  );
};

export default OvertimeChart;
