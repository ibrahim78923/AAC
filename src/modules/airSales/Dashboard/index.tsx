import { Grid, Typography } from '@mui/material';

import Actions from './ActionsOptions';
import Manage from './Manage';
import MeetingDetails from './MeetingDetails';
import TeamActivity from './TeamActivity';
import Widget from './Widget';
import CreateDashboard from './CreateDashboard';

const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={6}>
        <Typography variant="h4">Sales Dashboard</Typography>
      </Grid>
      <Grid item xs={6} sm={6}>
        <Actions />
      </Grid>
      <Grid item xs={6} sm={6}>
        <MeetingDetails />
      </Grid>
      <Grid item xs={6} sm={6}>
        <TeamActivity />
      </Grid>
      <Grid item xs={6} sm={6}>
        <Widget />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Manage />
      </Grid>
      <CreateDashboard />
    </Grid>
  );
};
export default Dashboard;
