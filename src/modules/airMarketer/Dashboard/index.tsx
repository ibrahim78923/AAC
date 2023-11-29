import { Box, Grid, Typography } from '@mui/material';
import TotalMarketingEmail from './TotalMarketingEmail';
import FormsTable from './FormsTable';
import ContactCustomerGraph from './ContactCustomerGraph';
import CtaViews from './CtaViews';
import ManageDashboardOptions from './ManageDashboardOptions';
import useToggle from '@/hooks/useToggle';
import ShareOptions from './ShareOptions';
import useDashboard from './useDashboard';
import Manage from './Manage';
import CreateDashboard from './CreateDashboard';

const Dashboard = () => {
  const [isToggled, toggle] = useToggle(false);
  const {
    isShowCreateDashboardForm,
    setIsShowCreateDashboardForm,
    isShowEditDashboard,
    setIsShowEditDashboard,
  } = useDashboard();
  return (
    <>
      <Grid container spacing={2} pl={5}>
        {!isToggled && !isShowEditDashboard && (
          <>
            <Grid
              item
              md={12}
              lg={12}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography variant="h4">Marketing Dashboard</Typography>
              <Box style={{ display: 'flex' }}>
                <ShareOptions setIsShowEditDashboard={setIsShowEditDashboard} />
                <ManageDashboardOptions toggle={toggle} />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <ContactCustomerGraph />
            </Grid>

            <Grid item xs={12} lg={6}>
              <CtaViews />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TotalMarketingEmail />
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormsTable />
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
        {(isShowCreateDashboardForm || isShowEditDashboard) && (
          <Grid item xs={12} sm={12}>
            <CreateDashboard
              setIsShowCreateDashboardForm={setIsShowCreateDashboardForm}
              isShowEditDashboard={isShowEditDashboard}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Dashboard;
