import { Grid, Typography, Stack } from '@mui/material';
import Actions from './ActionsOptions';
import MeetingDetails from './MeetingDetails';
import TeamActivity from './TeamActivity';
import Widget from './Widget';
import CreateDashboardOptions from './CreateDashboardOptions';
import DealsGraph from './DealsGraph';
import useDashboard from './useDashboard';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

const Dashboard = () => {
  const {
    setIsShowEditDashboard,
    dropdownOptions,
    setSelectedDashboard,
    dashboardListLoading,
    dashboardsData,
    dashboardLoading,
  } = useDashboard();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack direction={{ sm: 'row' }} justifyContent="space-between" gap={1}>
          <Typography variant="h3">Sales Dashboard</Typography>
          <Stack direction={{ sm: 'row' }} gap={1}>
            <Actions setIsShowEditDashboard={setIsShowEditDashboard} />
            <CreateDashboardOptions
              listData={dropdownOptions}
              selectedDashboard={setSelectedDashboard}
              isLoading={dashboardListLoading}
            />
          </Stack>
        </Stack>
      </Grid>

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
    </Grid>
  );
};
export default Dashboard;
