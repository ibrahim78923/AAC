import { createElement } from 'react';
import {
  Grid,
  Typography,
  Stack,
  Button,
  Skeleton,
  Box,
  LinearProgress,
} from '@mui/material';
import Actions from './ActionsOptions';
import MeetingDetails from './MeetingDetails';
import TeamActivity from './TeamActivity';
import Widget from './Widget';
import CreateDashboardOptions from './CreateDashboardOptions';
import DealsGraph from './DealsGraph';
import useDashboard from './useDashboard';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import NoData from '@/components/NoData';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { PlusIcon } from '@/assets/icons';
import { capitalizeFirstLetters } from '@/utils';
import { ReportsWidgets } from './ReportsWidgets';
import { REPORT_TYPES } from '@/constants/strings';
import DealsReportsAnalytics from './DealsReportsAnalytics';
import ForecastPipelineAnalytics from './ForecastPipelineAnalytics';
import ForecastCategoryAnalytics from './ForecastCategoryAnalytics';
import { indexNumbers } from '@/constants';
import { Autorenew } from '@mui/icons-material';
import { pxToRem } from '@/utils/getFontValue';

const Dashboard = () => {
  const {
    AIR_SALES_DASHBOARD_WIDGETS_COMPONENTS,
    lazyGetSingleSalesDashboardStatus,
    setSelectedDashboard,
    dashboardListLoading,
    dashboardNotFound,
    apiCallInProgress,
    dashboardLoading,
    dropdownOptions,
    dashboardsData,
    handelNavigate,
    timeLapse,
    theme,
    user,
  } = useDashboard();

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {dashboardLoading ? (
            <Skeleton
              width={250}
              height={25}
              variant="rectangular"
              animation="wave"
            />
          ) : (
            <Stack direction="column">
              <Typography
                variant="h3"
                color={theme?.palette?.primary?.main}
                fontWeight={600}
              >
                {capitalizeFirstLetters(dashboardsData?.dashboard?.name)}
              </Typography>
            </Stack>
          )}
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction={{ md: 'row' }}
            gap={1}
            justifyContent={'space-between'}
          >
            <Box>
              {dashboardLoading ? (
                <Skeleton
                  width={350}
                  height={25}
                  variant={'rectangular'}
                  animation={'wave'}
                />
              ) : (
                <Typography variant="h4" color="blue.main">
                  {`Hi ${capitalizeFirstLetters(
                    user?.firstName ?? '---',
                  )}! Happy to see you again`}
                </Typography>
              )}
            </Box>
            <Stack direction="row" gap={1} flexWrap={'wrap'}>
              <Button
                className="small"
                variant="outlined"
                color="inherit"
                size="small"
                startIcon={<Autorenew />}
                onClick={lazyGetSingleSalesDashboardStatus?.refetch}
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
              {!dashboardNotFound && (
                <Actions selectedDashboard={dashboardsData} />
              )}
              <CreateDashboardOptions
                listData={dropdownOptions}
                selectedDashboard={setSelectedDashboard}
                isLoading={dashboardListLoading}
              />
              <Button
                onClick={handelNavigate}
                variant="outlined"
                color="inherit"
                className="small"
              >
                Manage Dashboards
              </Button>
            </Stack>
          </Stack>
        </Grid>
        {dashboardNotFound ? (
          <NoData message="No default dashboard found!">
            <PermissionsGuard
              permissions={[AIR_SALES_DASHBOARD_PERMISSIONS?.CREATE_DASHBOARD]}
            >
              <Button
                startIcon={<PlusIcon />}
                variant="contained"
                onClick={handelNavigate}
              >
                Create Dashboard
              </Button>
            </PermissionsGuard>
          </NoData>
        ) : (
          <>
            {dashboardLoading ? (
              <Grid item xs={12} p={1}>
                <SkeletonForm />
              </Grid>
            ) : (
              <>
                {/* Static Components */}
                {dashboardsData?.DEALS_CREATED_VS_CLOSED_DEALS && (
                  <Grid item xs={12} lg={6} mt={1}>
                    <DealsGraph
                      dealsData={dashboardsData?.DEALS_CREATED_VS_CLOSED_DEALS}
                    />
                  </Grid>
                )}

                {dashboardsData?.TEAM_ACTIVITIES_BY_ACTIVITY_DATE?.length >
                  indexNumbers?.ZERO && (
                  <Grid item xs={12} lg={6} mt={1}>
                    <TeamActivity
                      teamActivityDetails={
                        dashboardsData?.TEAM_ACTIVITIES_BY_ACTIVITY_DATE
                      }
                    />
                  </Grid>
                )}

                {dashboardsData?.MEETING_DETAILS?.length >
                  indexNumbers?.ZERO && (
                  <Grid item xs={12} lg={6} mt={1}>
                    <MeetingDetails
                      meetingsData={dashboardsData?.MEETING_DETAILS}
                    />
                  </Grid>
                )}

                {dashboardsData?.TOTAL_DEALS_OPEN_DEALS_TEAM_GOALS_CLOSED_WON_PUBLISHED_QUOTES && (
                  <Grid item xs={12} lg={6} mt={1}>
                    <Widget
                      widgetDetails={
                        dashboardsData?.TOTAL_DEALS_OPEN_DEALS_TEAM_GOALS_CLOSED_WON_PUBLISHED_QUOTES
                      }
                    />
                  </Grid>
                )}

                {dashboardsData?.DEAL_REPORTS && (
                  <Grid item xs={12} lg={12} mt={1}>
                    <DealsReportsAnalytics
                      isStatic={false}
                      pieChartData={dashboardsData?.DEAL_REPORTS?.res}
                      graphData={dashboardsData?.DEAL_REPORTS?.resByMonth}
                    />
                  </Grid>
                )}

                {dashboardsData?.FORECAST_PIPELINE_REPORT && (
                  <Grid item xs={12} lg={12} mt={1}>
                    <ForecastPipelineAnalytics
                      pipelineForecastData={
                        dashboardsData?.FORECAST_PIPELINE_REPORT
                      }
                      isLoading={dashboardLoading}
                      isStatic={false}
                    />
                  </Grid>
                )}

                {dashboardsData?.FORECAST_CATEGORY_REPORTS && (
                  <Grid item xs={12} lg={12} mt={1}>
                    <ForecastCategoryAnalytics
                      categoryForecastData={
                        dashboardsData?.FORECAST_CATEGORY_REPORTS
                      }
                      isLoading={dashboardLoading}
                      isStatic={false}
                    />
                  </Grid>
                )}

                {/* Dynamic Components */}
                {dashboardLoading ? (
                  <Grid item xs={12} p={1}>
                    <SkeletonForm />
                  </Grid>
                ) : (
                  dashboardsData?.dashboard?.reports?.map(
                    (item: any, index: number) => {
                      return item?.type === REPORT_TYPES?.STATIC ? (
                        <Grid item xs={12} key={item?.name}>
                          {AIR_SALES_DASHBOARD_WIDGETS_COMPONENTS?.[
                            item?.name
                          ] &&
                            createElement(
                              AIR_SALES_DASHBOARD_WIDGETS_COMPONENTS?.[
                                item?.name
                              ],
                              {
                                data: dashboardsData,
                                // Add any other necessary props here
                              },
                            )}
                        </Grid>
                      ) : (
                        <Grid item xs={12} lg={12} key={item?._id ?? index}>
                          <ReportsWidgets
                            reportWidgets={
                              dashboardsData?.[`genericReports${index}`]
                            }
                            reportResults={
                              dashboardsData?.[`genericReportsResult${index}`]
                            }
                          />
                        </Grid>
                      );
                    },
                  )
                )}
              </>
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default Dashboard;
