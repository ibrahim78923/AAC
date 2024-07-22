import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { SingleDashboard } from './SingleDashboard';
import { useDashboard } from './useDashboard';
import EmailThisDashboard from './EmailThisDashboard';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { pxToRem } from '@/utils/getFontValue';
import { truncateText } from '@/utils/avatarUtils';
import { AIR_SERVICES } from '@/constants';

const Dashboard = () => {
  const {
    dashboardId,
    setDashboardId,
    apiLoader,
    setApiLoader,
    dashboardDropdownActions,
    router,
    isDrawerOpen,
    setIsDrawerOpen,
    user,
    dashboardsListsOptions,
  } = useDashboard();

  return (
    <PermissionsGuard
      permissions={[AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD]}
    >
      {apiLoader?.isLoading || apiLoader?.isFetching ? (
        <Skeleton />
      ) : (
        <Typography variant="h3" color="primary.main">
          {`${truncateText(apiLoader?.data?.data?.dashboard?.name, 30)}` ??
            '---'}
        </Typography>
      )}
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1}
        mt={1}
      >
        <Typography variant="h4" fontWeight={500} color="blue.main">
          <Typography component="span" variant="h4">
            Hi {user?.firstName ?? '---'}!
          </Typography>{' '}
          Happy to See You again
        </Typography>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1}>
          <SingleDropdownButton
            dropdownOptions={dashboardDropdownActions}
            dropdownName="Actions"
            disabled={apiLoader?.isLoading || apiLoader?.isFetching}
          />
          <SingleDropdownButton
            dropdownOptions={dashboardsListsOptions}
            dropdownName="Dashboards"
            menuSxProps={{ height: pxToRem(400) }}
            disabled={apiLoader?.isLoading || apiLoader?.isFetching}
          />
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => router?.push(AIR_SERVICES?.MANAGE_DASHBOARD)}
            disabled={apiLoader?.isLoading || apiLoader?.isFetching}
          >
            Manage Dashboards
          </Button>
        </Box>
      </Box>
      <br />
      <SingleDashboard
        dashboardId={dashboardId}
        setDashboardId={setDashboardId}
        apiLoader={apiLoader}
        setApiLoader={setApiLoader}
      />
      <br />
      {isDrawerOpen && (
        <EmailThisDashboard
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      )}
    </PermissionsGuard>
  );
};

export default Dashboard;
