import { TicketStatusCount } from '@/modules/airServices/Dashboard/TicketStatusCount';
import { Box } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { useSingleDashboard } from './useSingleDashboard';
import { AIR_SERVICES } from '@/constants';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { DashboardFilter } from '../DashboardFilter';
import { FormProvider } from '@/components/ReactHookForm';
import { DashboardWidgets } from '../DashboardsWidgets';
import { DownloadDashboard } from '../DownloadDashboard';

export const SingleDashboard = (props: any) => {
  const { isPreviewMode = false, isDetailMode = false } = props;

  const {
    lazyGetSingleServicesDashboardStatus,
    ticketType,
    setTicketType,
    departmentId,
    setDepartmentId,
    router,
    methods,
    downloadRef,
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
              title={
                lazyGetSingleServicesDashboardStatus?.data?.data?.dashboard
                  ?.name ?? '---'
              }
              canMovedBack
              moveBack={() =>
                router?.push({
                  pathname: AIR_SERVICES?.DASHBOARD,
                })
              }
            >
              <DownloadDashboard
                name={
                  lazyGetSingleServicesDashboardStatus?.data?.data?.dashboard
                    ?.name
                }
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
            <DashboardWidgets
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
          </Box>
        </Box>
      </PermissionsGuard>
    </>
  );
};
