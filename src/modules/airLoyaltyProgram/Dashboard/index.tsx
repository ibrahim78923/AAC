import { Grid } from '@mui/material';
import { Widget } from './Widget';
import Header from './Header';
import DashboardTopUser from './DashboardTopUser';
import DashboardRewards from './DashboardRewards';
import DashboardGiftCard from './DashboardGiftCard';
import DashboardTransaction from './DashboardTransaction';
import DashboardLoyaltyAnalytics from './DashboardLoyaltyAnalytics';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';

export const Dashboard = () => {
  return (
    <>
      <PermissionsGuard
        permissions={[
          AIR_LOYALTY_PROGRAM_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD,
        ]}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Header />
          </Grid>

          <Grid item xs={12}>
            <Widget />
          </Grid>

          <Grid item xs={12}>
            <DashboardLoyaltyAnalytics />
          </Grid>

          <Grid item xs={12}>
            <DashboardTopUser />
          </Grid>

          <Grid item xs={4}>
            <DashboardRewards />
          </Grid>
          <Grid item xs={4}>
            <DashboardGiftCard />
          </Grid>
          <Grid item xs={4}>
            {' '}
            <DashboardTransaction />
          </Grid>
        </Grid>
      </PermissionsGuard>
    </>
  );
};
