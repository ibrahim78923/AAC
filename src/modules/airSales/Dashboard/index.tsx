import { Grid, Typography, Box } from '@mui/material';

import Actions from './ActionsOptions';
import Manage from './Manage';
import MeetingDetails from './MeetingDetails';
import TeamActivity from './TeamActivity';
import Widget from './Widget';
import CreateDashboard from './CreateDashboard';
import CreateDashboardOptions from './CreateDashboardOptions';
import useDashboard from './useDashboard';
import DealsGraph from './DealsGraph';

import useToggle from '@/hooks/useToggle';

const Dashboard = () => {
  const { isShowCreateDashboardForm, setIsShowCreateDashboardForm } =
    useDashboard();
  const [isToggled, toggle] = useToggle(false);

  return (
    <Grid container spacing={2}>
      {!isToggled && (
        <>
          <Grid
            item
            md={12}
            lg={12}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography variant="h4">Sales Dashboard</Typography>
            <Box style={{ display: 'flex' }}>
              <Actions />
              <CreateDashboardOptions toggle={toggle} />
            </Box>
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
