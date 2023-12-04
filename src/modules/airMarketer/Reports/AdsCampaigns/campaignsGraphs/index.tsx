import dynamic from 'next/dynamic';

import { Box, Card, Grid, useTheme } from '@mui/material';

import {
  options,
  series,
  totalAddSpendoptions,
  totalAddSpendseries,
} from './campaignsGraphs.data';
import { styles } from './campaignsGraphs.styles';

const CampaignsGraphs = () => {
  const theme = useTheme();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });
  return (
    <Grid container spacing={0.5}>
      <Grid item xs={6}>
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
      <Grid item xs={6}>
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
