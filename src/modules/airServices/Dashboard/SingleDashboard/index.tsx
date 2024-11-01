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

export const SingleDashboard = (props: any) => {
  const { isPreviewMode = false, isDetailMode = false } = props;
  const {
    lazyGetSingleServicesDashboardStatus,
    methods,
    downloadRef,
    moveToDashboard,
    dashboardName,
    reportsList,
    apiSuspenseState,
    hasDefaultDashboard,
    hasError,
    refetchApi,
  } = useSingleDashboard(props);

  return (
    <>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_MANAGE_DASHBOARD,
        ]}
      >
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
                hasDefaultDashboard={hasDefaultDashboard}
                hasError={hasError}
                refetchApi={refetchApi}
                showLoader={apiSuspenseState}
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
                hasDefaultDashboard={hasDefaultDashboard}
                hasError={hasError}
                refetchApi={refetchApi}
                showLoader={apiSuspenseState}
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
              />
            )}
          </Box>
        </Box>
      </PermissionsGuard>
    </>
  );
};
