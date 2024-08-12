import { Grid, Typography, Stack } from '@mui/material';
import Actions from './ActionsOptions';
import MeetingDetails from './MeetingDetails';
import TeamActivity from './TeamActivity';
import Widget from './Widget';
import CreateDashboardOptions from './CreateDashboardOptions';
import DealsGraph from './DealsGraph';

const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack direction={{ sm: 'row' }} justifyContent="space-between" gap={1}>
          <Typography variant="h3">Sales Dashboard</Typography>
          <Stack direction={{ sm: 'row' }} gap={1}>
            <Actions />
            <CreateDashboardOptions />
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} lg={6}>
        <DealsGraph />
      </Grid>

      <Grid item xs={12} lg={6}>
        <TeamActivity />
      </Grid>

      <Grid item xs={12} lg={6}>
        <MeetingDetails />
      </Grid>

      <Grid item xs={12} lg={6}>
        <Widget />
      </Grid>
    </Grid>
  );
};
export default Dashboard;
