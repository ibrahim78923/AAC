import { HeaderDashboard } from '@/modules/airServices/Dashboard/HeaderDashboard';
import { Box } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { SingleDashboard } from './SingleDashboard';

const Dashboard = () => {
  return (
    <PermissionsGuard
      permissions={[AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD]}
    >
      <Box>
        <HeaderDashboard />
        <br />
        <SingleDashboard />
        <br />
      </Box>
    </PermissionsGuard>
  );
};

export default Dashboard;
