import { TicketStatusCount } from '@/modules/airServices/Dashboard/TicketStatusCount';
import { Box } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { useSingleDashboard } from './useSingleDashboard';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { DashboardFilter } from '../DashboardFilter';
import { FormProvider } from '@/components/ReactHookForm';
import { DashboardWidgets } from '../DashboardsWidgets';
import { DownloadDashboard } from '../DownloadDashboard';
import { ApiStatusSuspense } from './ApiStatusSuspense';

const { VIEW_MANAGE_DASHBOARD } = AIR_SERVICES_DASHBOARD_PERMISSIONS ?? {};

export const SingleDashboard = (props: any) => {
  const { isPreviewMode = false, isDetailMode = false } = props;
  const {
    lazyGetSingleServicesDashboardStatus,
    ticketType,
    setTicketType,
    departmentId,
    setDepartmentId,
    methods,
    downloadRef,
    moveToDashboard,
    dashboardName,
    reportsList,
    apiSuspenseState,
  } = useSingleDashboard(props);

  return (
    <>
      <PermissionsGuard permissions={[VIEW_MANAGE_DASHBOARD]}>
        <Box>
          {isDetailMode ? (
            <PageTitledHeader
              title={dashboardName}
              canMovedBack
              moveBack={moveToDashboard}
            >
              <DownloadDashboard
                name={dashboardName}
                downloadRef={downloadRef}
              />
            </PageTitledHeader>
          ) : (
            <></>
          )}
          {isPreviewMode || isDetailMode ? (
            <></>
          ) : (
            <FormProvider methods={methods}>
              <DashboardFilter
                apiLoader={lazyGetSingleServicesDashboardStatus}
              />
            </FormProvider>
          )}
          <br />
          <Box ref={downloadRef}>
            <TicketStatusCount />
            <br />
            {apiSuspenseState || !!!reportsList?.length ? (
              <ApiStatusSuspense
                lazyGetSingleServicesDashboardStatus={
                  lazyGetSingleServicesDashboardStatus
                }
                reportsList={reportsList}
                isPreviewMode={isPreviewMode}
                isDetailMode={isDetailMode}
              />
            ) : (
              <DashboardWidgets
                reportsList={reportsList}
                apiData={lazyGetSingleServicesDashboardStatus?.data?.data}
                refetchApi={lazyGetSingleServicesDashboardStatus?.refetch}
                lazyGetSingleServicesDashboardStatus={
                  lazyGetSingleServicesDashboardStatus
                }
                isPreviewMode={isPreviewMode}
                isDetailMode={isDetailMode}
                ticketType={ticketType}
                setTicketType={setTicketType}
                departmentId={departmentId}
                setDepartmentId={setDepartmentId}
              />
            )}
          </Box>
        </Box>
      </PermissionsGuard>
    </>
  );
};
