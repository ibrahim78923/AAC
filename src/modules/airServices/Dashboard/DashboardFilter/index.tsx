import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Permissions } from '@/constants/permissions';
import EmailThisDashboard from '../EmailThisDashboard';
import { useDashboardFilter } from './useDashboardFilter';
import { DashboardListFieldDropdown } from '../DashboardFormFields/DashboardsListFieldDropdown';
import { TruncateText } from '@/components/TruncateText';
import { DownloadDashboards } from '../DownloadDashboards';
import { DASHBOARD_FILTER_PORTAL_ACTION } from './DashboardFilter.data';

export const DashboardFilter = (props: any) => {
  const { apiLoader, hasDefaultDashboard, hasError, showLoader, downloadRef } =
    props;

  const {
    dashboardDropdownActions,
    isPortalOpen,
    setIsPortalOpen,
    dashboardName,
    moveToManageDashboard,
    authUserName,
  } = useDashboardFilter(props);

  return (
    <>
      {showLoader ? (
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
        py={1}
        overflow={'auto'}
      >
        <Typography
          variant="h4"
          fontWeight={'fontWeightSmall'}
          color="blue.main"
        >
          <Typography component="span" variant="h4">
            Hi {authUserName}!
          </Typography>{' '}
          Happy to see you again
        </Typography>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1}>
          {hasError || hasDefaultDashboard ? (
            <></>
          ) : (
            <>
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_MANAGE_DASHBOARD,
                  AIR_SERVICES_DASHBOARD_PERMISSIONS?.SHARE_DASHBOARD,
                ]}
              >
                <SingleDropdownButton
                  dropdownOptions={dashboardDropdownActions}
                  dropdownName="Actions"
                  disabled={showLoader}
                  color="inherit"
                />
              </PermissionsGuard>
            </>
          )}
          {hasError ? (
            <> </>
          ) : (
            <>
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD,
                ]}
              >
                <DashboardListFieldDropdown disabled={showLoader} />
              </PermissionsGuard>
            </>
          )}
          <PermissionsGuard
            permissions={Permissions?.AIR_SERVICES_MANAGE_DASHBOARD}
          >
            <Button
              className="small"
              color="inherit"
              variant="outlined"
              onClick={moveToManageDashboard}
              disabled={showLoader}
            >
              Manage Dashboards
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>

      {isPortalOpen?.isOpen &&
        isPortalOpen?.action === DASHBOARD_FILTER_PORTAL_ACTION?.SEND_EMAIL && (
          <EmailThisDashboard
            isPortalOpen={isPortalOpen}
            setIsPortalOpen={setIsPortalOpen}
            apiLoader={apiLoader}
          />
        )}

      {isPortalOpen?.isOpen &&
        isPortalOpen?.action ===
          DASHBOARD_FILTER_PORTAL_ACTION?.DOWNLOAD_DASHBOARD && (
          <DownloadDashboards
            isPortalOpen={isPortalOpen}
            setIsPortalOpen={setIsPortalOpen}
            downloadRef={downloadRef}
            name={dashboardName}
          />
        )}
    </>
  );
};
