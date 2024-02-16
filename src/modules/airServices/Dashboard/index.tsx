import { HeaderDashboard } from '@/modules/airServices/Dashboard/HeaderDashboard';
import { RecentActivitiesDashboardCard } from '@/modules/airServices/Dashboard/RecentActivitiesDashboard/RecentActivitiesDashboardCard';
import { TicketDashboardCards } from '@/modules/airServices/Dashboard/TicketDashboardCards';
import { Box, Button, Grid, Typography } from '@mui/material';
import { AnnouncementDashboardCard } from '@/modules/airServices/Dashboard/AnnouncementDashboard/AnnouncementDashboardCard';
import { TopPerformerDashboardCard } from '@/modules/airServices/Dashboard/TopPerformerDashboardCard';
import { v4 as uuidv4 } from 'uuid';
import { ticketDashboardCardsData } from './TicketDashboardCards/TicketDashboardCards.data';
import { recentActivitiesDashboardCardData } from './RecentActivitiesDashboard/RecentActivitiesDashboardCard/RecentActivitiesDashboardCard.data';
import { announcementDashboardCardData } from './AnnouncementDashboard/AnnouncementDashboardCard/AnnouncementDashboardCard.data';
import { topPerformerDashboardCardData } from './TopPerformerDashboardCard/TopPerformerDashboardCard.data';
import { BarChart } from './Chart/BarChart/BarChart';
import { PieChart } from './Chart/PieChart/PieChart';
import { HeaderBarChart } from './Chart/BarChart/HeaderBarChart';
import { HeaderPieChart } from './Chart/PieChart/HeaderPieChart';
import { AnnouncementHeader } from './AnnouncementDashboard/AnnouncementHeader';
import { RadialBarChart } from './Chart/RadialBarChart';
import { useDashboard } from './useDashboard';
import RecentActivitiesDashboardDrawer from './RecentActivitiesDashboard/RecentActivitiesDashboardDrawer';
import AnnouncementDashboard from './AnnouncementDashboard/AnnouncementDashboard';

const Dashboard = () => {
  const {
    setIsDrawerOpen,
    isDrawerOpen,
    handleIconButton,
    theme,
    isbarchart,
    setIsBarChart,
    handleAnnouncementIconButton,
    isAnnouncementDrawerOpen,
    setIsAnnouncementDrawerOpen,
  } = useDashboard();

  return (
    <Box>
      <HeaderDashboard />
      <br />
      <Grid container spacing={3}>
        {ticketDashboardCardsData?.map((item: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={item?.id}>
            <TicketDashboardCards
              icon={item?.icon}
              count={item?.count}
              label={item?.label}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8} sx={{ marginTop: 2 }}>
              <Box
                borderRadius={3}
                border={`1px solid ${theme?.palette?.grey?.[700]}`}
              >
                <br />
                <Box marginLeft={2}>
                  <HeaderBarChart
                    setIsBarChart={setIsBarChart}
                    isbarchart={isbarchart}
                  />
                </Box>
                <Box marginTop={2} marginBottom={2}>
                  {isbarchart ? <BarChart /> : <RadialBarChart />}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4} sx={{ marginTop: 2 }}>
              <Box
                borderRadius={3}
                border={`1px solid ${theme?.palette?.grey?.[700]}`}
              >
                <br />
                <Box marginLeft={2}>
                  <Typography variant="h5">Recent Activities</Typography>
                </Box>
                <Box marginTop={2} overflow={'scroll'} height={'36.5vh'}>
                  {recentActivitiesDashboardCardData?.map((item, index) => (
                    <Box key={uuidv4()}>
                      <RecentActivitiesDashboardCard
                        icon={item?.icon}
                        recentActivity={item?.recentActivity}
                        recentActivityRequest={item?.recentActivityRequest}
                        recentActivityDateTime={item?.recentActivityDateTime}
                        isBorderBottom={
                          recentActivitiesDashboardCardData?.length - 1 !==
                          index
                        }
                      />
                    </Box>
                  ))}
                </Box>
                <RecentActivitiesDashboardDrawer
                  isDrawerOpen={isDrawerOpen}
                  setIsDrawerOpen={setIsDrawerOpen}
                />
                <Box display={'flex'} justifyContent={'center'} marginTop={0.5}>
                  <Button variant="text" fullWidth onClick={handleIconButton}>
                    View All
                  </Button>
                </Box>
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
              >
                <Box>
                  <HeaderPieChart />
                </Box>
                <Box sx={{ marginTop: 2 }}>
                  <PieChart />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4}>
              {topPerformerDashboardCardData?.map((item) => (
                <Box key={uuidv4()}>
                  <TopPerformerDashboardCard
                    userImage={item?.userImage}
                    badgeImage={item?.badgeImage}
                    badgeNextImage={item?.badgeNextImage}
                    userImageText={item?.userImageText}
                    userImageDescription={item?.userImageDescription}
                    progressBarText={item?.progressBarText}
                    ProgressBarDescription={item?.ProgressBarDescription}
                    badgeText={item?.badgeText}
                    badgeNextText={item?.badgeNextText}
                  />
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} lg={4}>
              <Box
                borderRadius={3}
                border={`1px solid ${theme?.palette?.grey?.[700]}`}
              >
                <br />
                <Box>
                  <AnnouncementHeader />
                </Box>
                <Box overflow={'scroll'} height={'25vh'}>
                  {announcementDashboardCardData?.map((item, index) => (
                    <Box key={uuidv4()}>
                      <AnnouncementDashboardCard
                        icon={item?.icon}
                        announcement={item?.announcement}
                        announcementTime={item?.announcementTime}
                        announcementAvatar={item?.announcementAvatar}
                        isBorderBottom={
                          announcementDashboardCardData?.length - 1 !== index
                        }
                      />
                    </Box>
                  ))}
                </Box>
                <AnnouncementDashboard
                  isAnnouncementDrawerOpen={isAnnouncementDrawerOpen}
                  setIsAnnouncementDrawerOpen={setIsAnnouncementDrawerOpen}
                />
                <Box display={'flex'} justifyContent={'center'} marginTop={2}>
                  <Button
                    variant="text"
                    fullWidth
                    onClick={handleAnnouncementIconButton}
                  >
                    View All
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
