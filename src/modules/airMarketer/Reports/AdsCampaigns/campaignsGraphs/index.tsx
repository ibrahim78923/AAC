import dynamic from 'next/dynamic';

import { Box, Card, Grid, useTheme } from '@mui/material';

import { styles } from './campaignsGraphs.styles';
import useCampaignsGraphs from './useCampaignsGraphs';

const CampaignsGraphs = () => {
  const theme = useTheme();
  const { series, options, totalAddSpendseries, totalAddSpendoptions } =
    useCampaignsGraphs();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });
  return (
    <Grid container spacing={2}>
      <Grid item md={6} sm={12} xs={12}>
        <Card sx={{ p: '24px' }}>
          <Box height="350px" sx={styles?.appexChart(theme)}>
            <ReactApexChart
              options={totalAddSpendoptions}
              series={totalAddSpendseries}
              type="bar"
              height={350}
            />
          </Box>
        </Card>
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <Card sx={{ p: '24px' }}>
          <Box height="350px" sx={styles?.appexChart(theme)}>
            <ReactApexChart
              options={options}
              series={series}
              type="line"
              height={350}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CampaignsGraphs;
