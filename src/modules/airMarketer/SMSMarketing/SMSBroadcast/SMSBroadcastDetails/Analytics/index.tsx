import { Grid } from '@mui/material';
import StatusCards from '../../../SMSDashboard/StatusCards';
import StatisticsCard from '../../../SMSDashboard/StatisticsCard';
import { AnalyticsProps } from '@/modules/airMarketer/SMSMarketing/SMSBroadcast/SMSBroadcast-interface';

const Analytics = ({
  analyticsData,
  isDashboard,
  isLoading,
}: AnalyticsProps) => {
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
