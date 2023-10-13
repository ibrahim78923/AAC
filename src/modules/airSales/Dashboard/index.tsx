import { Grid, Typography, Box } from '@mui/material';

import Actions from './ActionsOptions';
import Manage from './Manage';
import MeetingDetails from './MeetingDetails';
import TeamActivity from './TeamActivity';
import Widget from './Widget';
import CreateDashboard from './CreateDashboard';
import CreateDashboardOptions from './CreateDashboardOptions';
import useDashboard from './useDashboard';
import useToggle from '@/hooks/useToggle';
import DealsGraph from './DealsGraph';

const Dashboard = () => {
  const { isShowCreateDashboardForm, setIsShowCreateDashboardForm } =
    useDashboard();
  const [isToggled, toggle] = useToggle(false);

  return (
    <Grid container spacing={2}>
      {!isToggled && (
        <>
          <Grid item xs={6} sm={6}>
            <Typography variant="h4">Sales Dashboard</Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Box sx={{ display: 'flex' }}>
              <Actions />
              <Box sx={{ marginLeft: '12px' }}>
                <CreateDashboardOptions toggle={toggle} />
              </Box>
            </Box>
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
          <Grid item xs={6} sm={6}>
            <DealsGraph />
          </Grid>
        </>
      )}
      {isToggled && !isShowCreateDashboardForm && (
        <>
          {' '}
          <Grid item xs={12} sm={12}>
            <Manage
              toggle={toggle}
              setIsShowCreateDashboardForm={setIsShowCreateDashboardForm}
            />
          </Grid>
        </>
      )}
      {isShowCreateDashboardForm && (
        <CreateDashboard
          setIsShowCreateDashboardForm={setIsShowCreateDashboardForm}
        />
      )}
    </Grid>
  );
};
export default Dashboard;
