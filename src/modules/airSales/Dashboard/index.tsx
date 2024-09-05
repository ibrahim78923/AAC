import { Grid, Typography, Stack, Button, Skeleton } from '@mui/material';
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
import useManage from './Manage/useManage';
import { capitalizeFirstLetters } from '@/utils';

const Dashboard = () => {
  const {
    setIsShowEditDashboard,
    setSelectedDashboard,
    dashboardListLoading,
    dashboardNotFound,
    dashboardLoading,
    dropdownOptions,
    dashboardsData,
  } = useDashboard();

  const { handelNavigate } = useManage();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack
            direction={{ sm: 'row' }}
            justifyContent="space-between"
            gap={1}
          >
            {dashboardLoading ? (
              <Skeleton
                width={250}
                height={36}
                variant={'rectangular'}
                animation={'wave'}
              />
            ) : (
              <Stack direction="column">
                <Typography variant="h3">
                  {capitalizeFirstLetters(dashboardsData?.dashboard?.name)}
                </Typography>
              </Stack>
            )}

            <Stack direction={{ sm: 'row' }} gap={1}>
              {!dashboardNotFound && (
                <Actions
                  setIsShowEditDashboard={setIsShowEditDashboard}
                  selectedDashboard={dashboardsData}
                />
              )}
              <CreateDashboardOptions
                listData={dropdownOptions}
                selectedDashboard={setSelectedDashboard}
                isLoading={dashboardListLoading}
              />
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
              <SkeletonForm />
            ) : (
              <>
                {dashboardsData?.DEALS_CREATED_VS_CLOSED_DEALS && (
                  <Grid item xs={12} lg={6}>
                    <DealsGraph
                      dealsData={dashboardsData?.DEALS_CREATED_VS_CLOSED_DEALS}
                    />
                  </Grid>
                )}

                {dashboardsData?.TEAM_ACTIVITIES_BY_ACTIVITY_DATE && (
                  <Grid item xs={12} lg={6}>
                    <TeamActivity
                      teamActivityDetails={
                        dashboardsData?.TEAM_ACTIVITIES_BY_ACTIVITY_DATE
                      }
                    />
                  </Grid>
                )}

                {dashboardsData?.MEETING_DETAILS && (
                  <Grid item xs={12} lg={6}>
                    <MeetingDetails
                    // meetingsData={dashboardsData?.MEETING_DETAILS}
                    />
                  </Grid>
                )}

                {dashboardsData?.TOTAL_DEALS_OPEN_DEALS_TEAM_GOALS_CLOSED_WON_PUBLISHED_QUOTES && (
                  <Grid item xs={12} lg={6}>
                    <Widget
                      widgetDetails={
                        dashboardsData?.TOTAL_DEALS_OPEN_DEALS_TEAM_GOALS_CLOSED_WON_PUBLISHED_QUOTES
                      }
                    />
                  </Grid>
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
