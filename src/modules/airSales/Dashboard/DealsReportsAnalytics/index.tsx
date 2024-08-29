import { Box, Grid, Typography, useTheme } from '@mui/material';
import {
  options,
  optionsBar,
  series,
  seriesBar,
} from './DealsReportsAnalytics.data';
import ReactApexChart from 'react-apexcharts';
import { styles } from './DealsReportsAnalytics.styles';

const DealsReportsAnalytics = ({
  dealsReportsCardsData,
  dealsReportsGraphData,
}: any) => {
  const theme = useTheme();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          sx={{
            border: `1px solid ${theme?.palette?.custom.off_white_three}`,
            padding: '2rem',
            borderRadius: '8px',
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ color: `${theme?.palette?.slateBlue?.main}` }}
            >
              Deals Analytics
            </Typography>
          </Box>
          <ReactApexChart
            options={optionsBar(theme)}
            series={seriesBar(dealsReportsGraphData)}
            type="bar"
            height={290}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={styles?.pieChart(theme)}>
          <Box>
            <Typography
              variant="h5"
              sx={{ color: `${theme?.palette?.slateBlue?.main}` }}
            >
              Deals Analytics
            </Typography>
          </Box>
          <ReactApexChart
            options={options(theme)}
            series={series(dealsReportsCardsData)}
            type="pie"
            width={450}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default DealsReportsAnalytics;
