import { TicketDashboardCards } from '@/modules/airServices/Dashboard/TicketDashboardCards';
import { Box, Button, Grid, Skeleton } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import NoData from '@/components/NoData';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { REPORT_TYPES } from '@/constants/strings';
import { createElement } from 'react';
import { useSingleDashboard } from './useSingleDashboard';
import { ticketDashboardCardsData } from '../TicketDashboardCards/TicketDashboardCards.data';
import { AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS } from '../CreateDashboard/CreateDashboard.data';
import { ReportsWidgets } from '../ReportsWidgets';
import { NO_DEFAULT_DASHBOARD } from '../Dashboard.data';
import { AIR_SERVICES } from '@/constants';

export const SingleDashboard = (props: any) => {
  const { isPreviewMode = false } = props;
  const {
    cardData,
    isLoading,
    isFetching,
    lazyGetSingleServicesDashboardStatus,
    ticketType,
    setTicketType,
    departmentId,
    setDepartmentId,
    router,
  } = useSingleDashboard(props);

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

  return (
    <PermissionsGuard
      permissions={[AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_MANAGE_DASHBOARD]}
    >
      <Box>
        <br />
        {isLoading || isFetching ? (
          <Skeleton variant="text" height="100%" />
        ) : ticketDashboardCardsData(cardData)?.length > 0 ? (
          <Grid container spacing={3}>
            {ticketDashboardCardsData(cardData)?.map((item: any) => (
              <Grid key={item?.id} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                <TicketDashboardCards
                  icon={item?.icon}
                  count={item?.count}
                  label={item?.label}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <NoData message={'No data is available'} height={'100%'} />
        )}

        <br />
        {lazyGetSingleServicesDashboardStatus?.isError ? (
          <ApiErrorState
            message={
              lazyGetSingleServicesDashboardStatus?.error?.data?.message ===
              NO_DEFAULT_DASHBOARD
                ? 'No default dashboard found!'
                : 'Something went wrong'
            }
          >
            {lazyGetSingleServicesDashboardStatus?.error?.data?.message ===
              NO_DEFAULT_DASHBOARD && (
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_DASHBOARD_PERMISSIONS?.CREATE_DASHBOARD,
                ]}
              >
                <Button
                  variant="contained"
                  onClick={() => router?.push(AIR_SERVICES?.CREATE_DASHBOARD)}
                >
                  Create Dashboard
                </Button>
              </PermissionsGuard>
            )}
          </ApiErrorState>
        ) : !!!lazyGetSingleServicesDashboardStatus?.data?.data?.dashboard
            ?.reports?.length ? (
          <NoData />
        ) : (
          <Grid container spacing={3}>
            {lazyGetSingleServicesDashboardStatus?.data?.data?.dashboard?.reports?.map(
              (item: any, index: any) =>
                item?.type === REPORT_TYPES?.STATIC ? (
                  <Grid item xs={12} lg={6} key={item?.name}>
                    {AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS?.[item?.name] &&
                      createElement(
                        AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS?.[item?.name],
                        {
                          data: lazyGetSingleServicesDashboardStatus?.data
                            ?.data,
                          ticketType,
                          setTicketType,
                          departmentId,
                          setDepartmentId,
                          isPreviewMode: isPreviewMode,
                        },
                      )}
                  </Grid>
                ) : (
                  <Grid item xs={12} key={item?.name ?? index}>
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
                ),
            )}
          </Grid>
        )}
      </Box>
    </PermissionsGuard>
  );
};
