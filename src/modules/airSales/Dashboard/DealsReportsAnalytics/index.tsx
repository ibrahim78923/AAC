import { Box, Grid, Typography, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import {
  dealsReportsCardsData,
  dealsReportsGraphData,
  options,
  optionsBar,
  series,
  seriesBar,
} from './DealsReportsAnalytics.data';
import { styles } from './DealsReportsAnalytics.styles';

// Dynamically import ReactApexChart with no SSR
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const DealsReportsAnalytics = (props: any) => {
  const { isStatic = false, graphData, pieChartData } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        border: `1px solid ${theme?.palette?.custom.off_white_three}`,
        padding: '2rem',
        borderRadius: '8px',
      }}
    >
      <Grid container spacing={2}>
        <Grid xs={12} sx={{ textAlign: 'center', paddingY: '1rem' }}>
          <Typography
            variant="h3"
            sx={{ color: `${theme?.palette?.slateBlue?.main}` }}
          >
            Deals Analytics
          </Typography>
        </Grid>
        <Grid item xs={12} md={isStatic ? 12 : 6}>
          <Box
            sx={{
              border: `1px solid ${theme?.palette?.custom.off_white_three}`,
              padding: '2rem',
              borderRadius: '8px',
            }}
          >
            {/* <Box>
            <Typography
              variant="h5"
              sx={{ color: `${theme?.palette?.slateBlue?.main}` }} >
              Deals Analytics
            </Typography>
          </Box> */}
            <ReactApexChart
              options={optionsBar(theme)}
              series={seriesBar(!isStatic ? graphData : dealsReportsGraphData)}
              type="bar"
              height={290}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={isStatic ? 12 : 6}>
          <Box sx={styles?.pieChart(theme)}>
            {/* <Box>
            <Typography
              variant="h5"
              sx={{ color: `${theme?.palette?.slateBlue?.main}` }}>
              Deals Analytics
            </Typography>
          </Box> */}
            <ReactApexChart
              options={options(theme)}
              series={series(!isStatic ? pieChartData : dealsReportsCardsData)}
              type="pie"
              width={450}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DealsReportsAnalytics;
