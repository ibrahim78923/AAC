import { Box } from '@mui/material';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useManageDashboard } from './useManageDashboard';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ManageDashboardHeader } from '../ManageDashboardHeader';
import { ManageDashboardList } from '../ManageDashboardList';

export const ManageDashboard = () => {
  const { moveToDashboard, moveToCreateDashboard } = useManageDashboard();

  return (
    <>
      <PageTitledHeader
        title={'Manage Dashboards'}
        canMovedBack
        moveBack={moveToDashboard}
        addTitle={'Create Dashboard'}
        createPermissionKey={[
          AIR_SERVICES_DASHBOARD_PERMISSIONS?.CREATE_DASHBOARD,
        ]}
        handleAction={moveToCreateDashboard}
      />
      <PermissionsGuard
        permissions={[AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD]}
      >
        <Box
          border={'1px solid'}
          borderColor={'custom.off_white_three'}
          borderRadius={2}
        >
          <ManageDashboardHeader />
          <ManageDashboardList />
        </Box>
      </PermissionsGuard>
    </>
  );
};
