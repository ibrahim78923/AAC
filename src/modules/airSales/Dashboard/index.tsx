import { Grid, Typography, Box } from '@mui/material';
import Actions from './ActionsOptions';
import MeetingDetails from './MeetingDetails';
import TeamActivity from './TeamActivity';
import Widget from './Widget';
import CreateDashboardOptions from './CreateDashboardOptions';
import useDashboard from './useDashboard';
import DealsGraph from './DealsGraph';

const Dashboard = () => {
  const {} = useDashboard();

  return (
    <Grid container spacing={2} sx={{ paddingLeft: '0px' }}>
      <>
        <Grid
          item
          md={12}
          lg={12}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: '0px',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h3">Sales Dashboard</Typography>

          <Box sx={{ display: 'flex', margin: { xs: '10px 0px', md: '0px' } }}>
            <Actions />
            <CreateDashboardOptions />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6} style={{ paddingLeft: '0px' }}>
          <DealsGraph />
        </Grid>

        <Grid item xs={12} lg={6}>
          <TeamActivity />
        </Grid>
        <Grid item xs={12} lg={6} style={{ paddingLeft: '0px' }}>
          <MeetingDetails />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Widget />
        </Grid>
      </>
    </Grid>
  );
};
export default Dashboard;
