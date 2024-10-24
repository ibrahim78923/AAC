import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import {
  Box,
  Button,
  LinearProgress,
  Skeleton,
  Typography,
} from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Permissions } from '@/constants/permissions';
import EmailThisDashboard from '../EmailThisDashboard';
import { useDashboardFilter } from './useDashboardFilter';
import { DashboardListFieldDropdown } from '../DashboardFormFields/DashboardsListFieldDropdown';
import { TruncateText } from '@/components/TruncateText';
import { Autorenew } from '@mui/icons-material';
import { pxToRem } from '@/utils/getFontValue';

const { VIEW_MANAGE_DASHBOARD, SHARE_DASHBOARD, VIEW_DASHBOARD } =
  AIR_SERVICES_DASHBOARD_PERMISSIONS ?? {};
const { AIR_SERVICES_MANAGE_DASHBOARD } = Permissions ?? {};

export const DashboardFilter = (props: any) => {
  const { apiLoader } = props;
  const {
    dashboardDropdownActions,
    isDrawerOpen,
    setIsDrawerOpen,
    user,
    apiCallInProgress,
    dashboardName,
    moveToManageDashboard,
    refetch,
    timeLapse,
  } = useDashboardFilter(props);

  return (
    <>
      {apiCallInProgress ? (
        <Skeleton />
      ) : (
        <Typography variant="h3" color="primary.main">
          <TruncateText text={dashboardName} size={35} />
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
        <Typography
          variant="h4"
          fontWeight={'fontWeightSmall'}
          color="blue.main"
        >
          <Typography component="span" variant="h4">
            Hi {user?.firstName ?? '---'}!
          </Typography>{' '}
          Happy to see you again
        </Typography>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1}>
          <Button
            className="small"
            variant="outlined"
            color="inherit"
            size="small"
            startIcon={<Autorenew />}
            onClick={refetch}
            disabled={apiCallInProgress}
            sx={{
              fontSize: pxToRem(12),
              fontWeight: 'fontWeightRegular',
              textTransform: 'lowercase',
            }}
          >
            {!!apiCallInProgress ? (
              <Box>
                <LinearProgress sx={{ width: pxToRem(70) }} />
              </Box>
            ) : (
              timeLapse?.lastFetchLapseTime
            )}
          </Button>
          <PermissionsGuard
            permissions={[VIEW_MANAGE_DASHBOARD, SHARE_DASHBOARD]}
          >
            <SingleDropdownButton
              dropdownOptions={dashboardDropdownActions}
              dropdownName="Actions"
              disabled={apiCallInProgress}
              color="inherit"
            />
          </PermissionsGuard>
          <PermissionsGuard permissions={[VIEW_DASHBOARD]}>
            <DashboardListFieldDropdown disabled={apiCallInProgress} />
          </PermissionsGuard>
          <PermissionsGuard permissions={AIR_SERVICES_MANAGE_DASHBOARD}>
            <Button
              className="small"
              color="inherit"
              variant="outlined"
              onClick={moveToManageDashboard}
              disabled={apiCallInProgress}
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
          apiLoader={apiLoader}
        />
      )}
    </>
  );
};
