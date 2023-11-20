import { Grid } from '@mui/material';

import StatusCards from '../../../SMSDashboard/StatusCards';

import StatisticsCard from '../../../SMSDashboard/StatisticsCard';

const Analytics = () => {
  return (
    <Grid container>
      <Grid xs={12}>
        <StatusCards />
      </Grid>
      <Grid xs={12}>
        <StatisticsCard />
      </Grid>
    </Grid>
  );
};

export default Analytics;
