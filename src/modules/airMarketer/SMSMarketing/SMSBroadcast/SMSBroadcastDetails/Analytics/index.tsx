import { Grid } from '@mui/material';
import StatusCards from '../../../SMSDashboard/StatusCards';
import StatisticsCard from '../../../SMSDashboard/StatisticsCard';

const Analytics = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <StatusCards />
      </Grid>
      <Grid item xs={12}>
        <StatisticsCard />
      </Grid>
    </Grid>
  );
};

export default Analytics;
