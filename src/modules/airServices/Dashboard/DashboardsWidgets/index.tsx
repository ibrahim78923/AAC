import { NO_DEFAULT_DASHBOARD } from '../Dashboard.data';
import { Box, Button, Grid } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import NoData from '@/components/NoData';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { REPORT_TYPES } from '@/constants/strings';
import { createElement } from 'react';
import { ReportsWidgets } from '../ReportsWidgets';
import { AIR_SERVICES } from '@/constants';
import { AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS } from '../UpsertDashboard/UpsertDashboard.data';
import { useRouter } from 'next/router';

export const DashboardWidgets = (props: any) => {
  const router = useRouter();
  const {
    lazyGetSingleServicesDashboardStatus,
    isPreviewMode,
    isDetailMode,
    ticketType,
    setTicketType,
    departmentId,
    setDepartmentId,
  } = props;

  if (
    lazyGetSingleServicesDashboardStatus?.isLoading ||
    lazyGetSingleServicesDashboardStatus?.isFetching
  )
    return (
      <Box width={'100%'}>
        <br />
        <SkeletonTable />
      </Box>
    );
  if (lazyGetSingleServicesDashboardStatus?.isError) {
    const isNoDefaultDashboardError =
      lazyGetSingleServicesDashboardStatus?.error?.data?.message ===
      NO_DEFAULT_DASHBOARD;
    const refreshAction = lazyGetSingleServicesDashboardStatus?.refetch;
    return (
      <>
        {isPreviewMode || isDetailMode ? (
          <ApiErrorState canRefresh refresh={refreshAction} />
        ) : (
          <ApiErrorState
            message={
              isNoDefaultDashboardError
                ? 'No default dashboard found!'
                : 'Something went wrong'
            }
            canRefresh={!isNoDefaultDashboardError}
            refresh={refreshAction}
          >
            {isNoDefaultDashboardError && (
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_DASHBOARD_PERMISSIONS?.CREATE_DASHBOARD,
                ]}
              >
                <Button
                  className="small"
                  variant="contained"
                  onClick={() => router?.push(AIR_SERVICES?.CREATE_DASHBOARD)}
                >
                  Create Dashboard
                </Button>
              </PermissionsGuard>
            )}
          </ApiErrorState>
        )}
      </>
    );
  }
  if (
    !!!lazyGetSingleServicesDashboardStatus?.data?.data?.dashboard?.reports
      ?.length
  )
    return <NoData />;

  return (
    <Grid container spacing={3}>
      {lazyGetSingleServicesDashboardStatus?.data?.data?.dashboard?.reports?.map(
        (item: any, index: number) => {
          return item?.type === REPORT_TYPES?.STATIC ? (
            <Grid item xs={12} lg={6} key={item?.name}>
              {AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS?.[item?.name] &&
                createElement(
                  AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS?.[item?.name],
                  {
                    data: lazyGetSingleServicesDashboardStatus?.data?.data,
                    ticketType,
                    setTicketType,
                    departmentId,
                    setDepartmentId,
                    isPreviewMode: isPreviewMode,
                    getSingleDashboardData:
                      lazyGetSingleServicesDashboardStatus?.refetch,
                  },
                )}
            </Grid>
          ) : (
            <Grid item xs={12} key={item?._id ?? index}>
              <ReportsWidgets
                reportWidgets={
                  lazyGetSingleServicesDashboardStatus?.data?.data?.[
                    `genericReports${index}`
                  ]
                }
                reportResults={
                  lazyGetSingleServicesDashboardStatus?.data?.data?.[
                    `genericReportsResult${index}`
                  ]
                }
              />
            </Grid>
          );
        },
      )}
    </Grid>
  );
};
