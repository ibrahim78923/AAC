import { HeaderDashboard } from '@/modules/airServices/Dashboard/HeaderDashboard';
import { TicketDashboardCards } from '@/modules/airServices/Dashboard/TicketDashboardCards';
import { Box, Grid, Skeleton } from '@mui/material';
import { TopPerformer } from '@/modules/airServices/Dashboard/TopPerformer';
import { ticketDashboardCardsData } from './TicketDashboardCards/TicketDashboardCards.data';
import { useDashboard } from './useDashboard';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import NoData from '@/components/NoData';
import { PieChart } from './Chart/PieChart';
import { TicketBased } from './Chart/TicketBased';
import { Announcement } from './Announcement';
import { RecentActivities } from './RecentActivities';

const Dashboard = () => {
  const { theme, cardData, isLoading, isFetching } = useDashboard();

  return (
    <PermissionsGuard
      permissions={[AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD]}
    >
      <Box>
        <HeaderDashboard />
        <br />
        {isLoading || isFetching ? (
          <Skeleton variant="text" height="100%" />
        ) : ticketDashboardCardsData(cardData)?.length > 0 ? (
          <Grid container spacing={3}>
            {ticketDashboardCardsData(cardData)?.map((item: any) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={item?._id}>
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

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={8} sx={{ marginTop: 2 }}>
                <Box
                  borderRadius={3}
                  border={`1px solid ${theme?.palette?.grey?.[700]}`}
                  height="100%"
                >
                  <Box marginLeft={2}>
                    <Box marginTop={2} marginBottom={2}>
                      <TicketBased />
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={4} sx={{ marginTop: 2 }}>
                <Box
                  borderRadius={3}
                  border={`1px solid ${theme?.palette?.grey?.[700]}`}
                  height="100%"
                >
                  <RecentActivities />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4}>
                <Box
                  borderRadius={3}
                  p={2}
                  border={`1px solid ${theme?.palette?.grey?.[700]}`}
                  height="100%"
                >
                  <PieChart />
                </Box>
              </Grid>

              <Grid item xs={12} lg={4}>
                <TopPerformer />
              </Grid>

              <Grid item xs={12} lg={4}>
                <Box
                  borderRadius={3}
                  border={`1px solid ${theme?.palette?.grey?.[700]}`}
                  height="100%"
                >
                  <Announcement />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PermissionsGuard>
  );
};

export default Dashboard;
