import { HeaderDashboard } from '@/modules/airServices/Dashboard/HeaderDashboard';
import { RecentActivitiesDashboardCard } from '@/modules/airServices/Dashboard/RecentActivitiesDashboardCard';
import { TicketDashboardCards } from '@/modules/airServices/Dashboard/TicketDashboardCards';
import { Box, Button, Grid, Typography } from '@mui/material';
import { AnnouncementDashboardCard } from '@/modules/airServices/Dashboard/AnnouncementDashboardCard';
import { TopPerformerDashboardCard } from '@/modules/airServices/Dashboard/TopPerformerDashboardCard';
import { v4 as uuidv4 } from 'uuid';
import TicketDashboardCardsData from './TicketDashboardCards/TicketDashboardCards.data';
import RecentActivitiesDashboardCardData from './RecentActivitiesDashboardCard/RecentActivitiesDashboardCard.data';
import AnnouncementDashboardCardData from './AnnouncementDashboardCard/AnnouncementDashboardCard.data';
import TopPerformerDashboardCardData from './TopPerformerDashboardCard/TopPerformerDashboardCard.data';
import { BarChart } from './Chart/BarChart';
import { PieChart } from './Chart/PieChart';

const Dashboard = () => {
  return (
    <div>
      <HeaderDashboard />
      <br />
      <Box sx={{ display: 'flex', gap: 1 }}>
        {TicketDashboardCardsData?.map(({ icon, count, label }) => (
          <Box key={uuidv4()} flex={1}>
            <TicketDashboardCards icon={icon} count={count} label={label} />
          </Box>
        ))}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8} sx={{ marginTop: 2 }}>
              <Box
                sx={{
                  borderRadius: '0.75rem',
                  border: '0.063rem solid #E5E7EB',
                  background: '#FFF',
                }}
              >
                <br />
                <Box sx={{ marginLeft: 2 }}>
                  <Typography variant="h5">Tickets based on Status</Typography>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                  <BarChart />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4} sx={{ marginTop: 2 }}>
              <Box
                sx={{
                  borderRadius: '0.75rem',
                  border: '0.063rem solid #E5E7EB',
                  background: '#FFF',
                }}
              >
                <br />
                <Box sx={{ marginLeft: 2 }}>
                  <Typography variant="h5">Recent Activities</Typography>
                </Box>
                <Box sx={{ marginTop: 2 }} key={uuidv4()}>
                  {RecentActivitiesDashboardCardData?.map(
                    (
                      {
                        recentactivitytext,
                        recentactivitytextone,
                        recentactivitytexttwo,
                        icon,
                      },
                      index,
                    ) => (
                      <Box key={uuidv4()}>
                        <RecentActivitiesDashboardCard
                          icon={icon}
                          recentactivitytext={recentactivitytext}
                          recentactivitytextone={recentactivitytextone}
                          recentactivitytexttwo={recentactivitytexttwo}
                          isborderbottom={
                            RecentActivitiesDashboardCardData?.length - 1 !==
                            index
                          }
                        />
                      </Box>
                    ),
                  )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="text">View All</Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4}>
              <Box
                sx={{
                  borderRadius: '0.75rem',
                  border: '0.063rem solid #E5E7EB',
                  background: '#FFF',
                }}
              >
                <br />
                <Box sx={{ marginLeft: 2 }}>
                  <Typography variant="h5">Agent Availability</Typography>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                  <PieChart />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Box>
                {TopPerformerDashboardCardData?.map(
                  ({
                    topperformancetext,
                    topperformancetextone,
                    topperformancetexttwo,
                    topperformancetextthree,
                    topperformancetextfour,
                    topperformancetextfive,
                    topperformancetextsix,
                    topperformancetextseven,

                    icon,
                    iconone,
                    icontwo,
                  }) => (
                    <Box key={uuidv4()}>
                      <TopPerformerDashboardCard
                        icon={icon}
                        iconone={iconone}
                        icontwo={icontwo}
                        topperformancetext={topperformancetext}
                        topperformancetextone={topperformancetextone}
                        topperformancetexttwo={topperformancetexttwo}
                        topperformancetextthree={topperformancetextthree}
                        topperformancetextfour={topperformancetextfour}
                        topperformancetextfive={topperformancetextfive}
                        topperformancetextsix={topperformancetextsix}
                        topperformancetextseven={topperformancetextseven}
                      />
                    </Box>
                  ),
                )}
              </Box>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Box
                sx={{
                  borderRadius: '0.75rem',
                  border: '0.063rem solid #E5E7EB',
                  background: '#FFF',
                }}
              >
                <br />
                <Box sx={{ marginLeft: 2 }}>
                  <Typography variant="h5">Announcements</Typography>
                </Box>
                <Box>
                  {AnnouncementDashboardCardData?.map(
                    (
                      {
                        icon,
                        Announcementtext,
                        Announcementtextone,
                        Announcementtexttwo,
                      },
                      index,
                    ) => (
                      <Box key={uuidv4()}>
                        <AnnouncementDashboardCard
                          icon={icon}
                          Announcementtext={Announcementtext}
                          Announcementtextone={Announcementtextone}
                          Announcementtexttwo={Announcementtexttwo}
                          isborderbottom={
                            AnnouncementDashboardCardData?.length - 1 !== index
                          }
                        />
                      </Box>
                    ),
                  )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button>View All</Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
