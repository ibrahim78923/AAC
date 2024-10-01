import { NO_DEFAULT_DASHBOARD } from '../Dashboard.data';
import { Button, Grid } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import NoData from '@/components/NoData';
import ApiErrorState from '@/components/ApiErrorState';
import { REPORT_TYPES } from '@/constants/strings';
import { createElement } from 'react';
import { ReportsWidgets } from '../ReportsWidgets';
import { AIR_SERVICES } from '@/constants';
import { AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS } from '../UpsertDashboard/UpsertDashboard.data';
import { useRouter } from 'next/router';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';

const { CREATE_DASHBOARD } = AIR_SERVICES_DASHBOARD_PERMISSIONS ?? {};
const { STATIC } = REPORT_TYPES ?? {};
const { CREATE_DASHBOARD: CREATE_DASHBOARD_ROUTE } = AIR_SERVICES ?? {};

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

  const apiCallInProgress =
    lazyGetSingleServicesDashboardStatus?.isLoading ||
    lazyGetSingleServicesDashboardStatus?.isFetching;
  const hasError = lazyGetSingleServicesDashboardStatus?.isError;
  const hasDefaultDashboard =
    lazyGetSingleServicesDashboardStatus?.error?.data?.message ===
    NO_DEFAULT_DASHBOARD;
  const reportsList =
    lazyGetSingleServicesDashboardStatus?.data?.data?.dashboard?.reports;
  const apiData = lazyGetSingleServicesDashboardStatus?.data?.data;
  const refetchApi = lazyGetSingleServicesDashboardStatus?.refetch;
  const errorMessage = hasDefaultDashboard
    ? 'No default dashboard found!'
    : 'Something went wrong';

  if (apiCallInProgress)
    return (
      <SkeletonCard
        flexDirection="column"
        gridSize={{ md: 6 }}
        outerPadding={{ x: 2, y: 6 }}
        isCircular={'rounded'}
        circularSkeletonSize={{ height: 25, width: '100%' }}
      />
    );

  if (hasError) {
    return (
      <>
        {isPreviewMode || isDetailMode ? (
          <ApiErrorState canRefresh refresh={refetchApi} />
        ) : (
          <ApiErrorState
            message={errorMessage}
            canRefresh={!hasDefaultDashboard}
            refresh={refetchApi}
          >
            {hasDefaultDashboard && (
              <PermissionsGuard permissions={[CREATE_DASHBOARD]}>
                <Button
                  className="small"
                  variant="contained"
                  onClick={() => router?.push(CREATE_DASHBOARD_ROUTE)}
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
  if (!!!reportsList?.length) return <NoData message="No widgets found" />;

  return (
    <Grid container spacing={3}>
      {reportsList?.map((item: any, index: number) => {
        return item?.type === STATIC ? (
          <Grid item xs={12} lg={6} key={item?.name}>
            {AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS?.[item?.name] &&
              createElement(
                AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS?.[item?.name],
                {
                  data: apiData,
                  ticketType,
                  setTicketType,
                  departmentId,
                  setDepartmentId,
                  isPreviewMode: isPreviewMode,
                  getSingleDashboardData: refetchApi,
                },
              )}
          </Grid>
        ) : (
          <Grid item xs={12} key={item?._id ?? index}>
            <ReportsWidgets
              reportWidgets={apiData?.[`genericReports${index}`]}
              reportResults={apiData?.[`genericReportsResult${index}`]}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
