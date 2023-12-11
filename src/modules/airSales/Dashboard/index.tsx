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
  const {
    isShowCreateDashboardForm,
    setIsShowCreateDashboardForm,
    isShowEditDashboard,
    setIsShowEditDashboard,
  } = useDashboard();
  const [isToggled, toggle] = useToggle(false);

  return (
    <Grid container spacing={2} sx={{ paddingLeft: '0px' }}>
      {!isToggled && !isShowEditDashboard && (
        <>
          <Grid
            item
            md={12}
            lg={12}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingLeft: '0px',
            }}
          >
            <Typography variant="h3">Sales Dashboard</Typography>

            <Box style={{ display: 'flex' }}>
              <Actions setIsShowEditDashboard={setIsShowEditDashboard} />
              <CreateDashboardOptions toggle={toggle} />
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
      )}
      {isToggled && !isShowCreateDashboardForm && (
        <>
          {' '}
          <Grid item xs={12} sm={12} style={{ paddingLeft: '0px' }}>
            <Manage
              toggle={toggle}
              setIsShowCreateDashboardForm={setIsShowCreateDashboardForm}
            />
          </Grid>
        </>
      )}
      {(isShowCreateDashboardForm || isShowEditDashboard) && (
        <Grid item xs={12} sm={12}>
          <CreateDashboard
            setIsShowCreateDashboardForm={setIsShowCreateDashboardForm}
            isShowEditDashboard={isShowEditDashboard}
          />
        </Grid>
      )}
    </Grid>
  );
};
export default Dashboard;
