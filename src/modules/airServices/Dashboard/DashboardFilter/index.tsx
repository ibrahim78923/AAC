import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { AIR_SERVICES } from '@/constants';
import { Permissions } from '@/constants/permissions';
import EmailThisDashboard from '../EmailThisDashboard';
import { useDashboardFilter } from './useDashboardFilter';
import { DashboardListFieldDropdown } from '../DashboardFormFields/DashboardsListFieldDropdown';
import { TruncateText } from '@/components/TruncateText';

export const DashboardFilter = (props: any) => {
  const { apiLoader } = props;
  const {
    dashboardDropdownActions,
    isDrawerOpen,
    setIsDrawerOpen,
    router,
    user,
  } = useDashboardFilter(props);

  return (
    <>
      {apiLoader?.isLoading || apiLoader?.isFetching ? (
        <Skeleton />
      ) : (
        <Typography variant="h3" color="primary.main">
          <TruncateText
            text={apiLoader?.data?.data?.dashboard?.name?.toLowerCase()}
            size={35}
          />
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
          Happy to see you again
        </Typography>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1}>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_MANAGE_DASHBOARD,
              AIR_SERVICES_DASHBOARD_PERMISSIONS?.SHARE_DASHBOARD,
            ]}
          >
            <SingleDropdownButton
              dropdownOptions={dashboardDropdownActions}
              dropdownName="Actions"
              disabled={apiLoader?.isLoading || apiLoader?.isFetching}
              color="inherit"
            />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD]}
          >
            <DashboardListFieldDropdown
              disabled={apiLoader?.isLoading || apiLoader?.isFetching}
            />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={Permissions?.AIR_SERVICES_MANAGE_DASHBOARD}
          >
            <Button
              className="small"
              color="inherit"
              variant="outlined"
              onClick={() => router?.push(AIR_SERVICES?.MANAGE_DASHBOARD)}
              disabled={apiLoader?.isLoading || apiLoader?.isFetching}
            >
              Manage Dashboards
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
      {isDrawerOpen && (
        <EmailThisDashboard
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      )}
    </>
  );
};
