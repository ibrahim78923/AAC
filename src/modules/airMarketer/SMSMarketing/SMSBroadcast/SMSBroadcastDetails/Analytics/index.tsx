import { Grid } from '@mui/material';
import StatusCards from '../../../SMSDashboard/StatusCards';
import StatisticsCard from '../../../SMSDashboard/StatisticsCard';

const Analytics = ({ analyticsData, isDashboard, isLoading }: any) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <StatusCards
          analytics={analyticsData?.statisticsData}
          isDashboard={isDashboard}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <StatisticsCard
          analytics={analyticsData?.statisticsData?.statistics}
          isDashboard={isDashboard}
        />
      </Grid>
    </Grid>
  );
};

export default Analytics;
