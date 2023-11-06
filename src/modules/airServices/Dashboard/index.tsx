import { HeaderDashboard } from '@/modules/airServices/Dashboard/HeaderDashboard';
import { RecentActivitiesDashboardCard } from '@/modules/airServices/Dashboard/RecentActivitiesDashboardCard';
import { TicketDashboardCards } from '@/modules/airServices/Dashboard/TicketDashboardCards';
import { Box, Button, Grid, Typography } from '@mui/material';
import { AnnouncementDashboardCard } from '@/modules/airServices/Dashboard/AnnouncementDashboardCard';
import { TopPerformerDashboardCard } from '@/modules/airServices/Dashboard/TopPerformerDashboardCard';
import { v4 as uuidv4 } from 'uuid';
import { ticketDashboardCardsData } from './TicketDashboardCards/TicketDashboardCards.data';
import { recentActivitiesDashboardCardData } from './RecentActivitiesDashboardCard/RecentActivitiesDashboardCard.data';
import { announcementDashboardCardData } from './AnnouncementDashboardCard/AnnouncementDashboardCard.data';
import { topPerformerDashboardCardData } from './TopPerformerDashboardCard/TopPerformerDashboardCard.data';
import { BarChart } from './Chart/BarChart';
import { PieChart } from './Chart/PieChart';
import { HeaderBarChart } from './Chart/HeaderBarChart';
import { HeaderPieChart } from './Chart/HeaderPieChart';
import { AnnouncementHeader } from './AnnouncementHeader';

const Dashboard = () => {
  return (
    <Box>
      <HeaderDashboard />
      <br />
      <Box display={'flex'} flexWrap={'wrap'} gap={1}>
        {ticketDashboardCardsData?.map((item) => (
          <Box key={uuidv4()} flex={1}>
            <TicketDashboardCards
              icon={item?.icon}
              count={item?.count}
              label={item?.label}
            />
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
                <Box marginLeft={2}>
                  <HeaderBarChart />
                </Box>
                <Box marginTop={2} marginBottom={2}>
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
                <Box marginLeft={2}>
                  <Typography variant="h5">Recent Activities</Typography>
                </Box>
                <Box marginTop={2} key={uuidv4()}>
                  {recentActivitiesDashboardCardData?.map((item, index) => (
                    <Box key={uuidv4()}>
                      <RecentActivitiesDashboardCard
                        icon={item?.icon}
                        recentActivityText={item?.recentActivityText}
                        recentActivityTextOne={item?.recentActivityTextOne}
                        recentactivitytextTwo={item?.recentactivitytextTwo}
                        isborderbottom={
                          recentActivitiesDashboardCardData?.length - 1 !==
                          index
                        }
                      />
                    </Box>
                  ))}
                </Box>
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  marginBottom={1}
                >
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
                  <HeaderPieChart />
                </Box>
                <Box sx={{ marginTop: 2 }}>
                  <PieChart />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Box>
                {topPerformerDashboardCardData?.map((item) => (
                  <Box key={uuidv4()}>
                    <TopPerformerDashboardCard
                      icon={item?.icon}
                      iconOne={item?.iconOne}
                      iconTwo={item?.iconTwo}
                      topPerformanceText={item?.topPerformanceText}
                      topPerformanceTextOne={item?.topPerformanceTextOne}
                      topPerformanceTextTwo={item?.topPerformanceTextTwo}
                      topPerformanceTextThree={item?.topPerformanceTextThree}
                      topPerformanceTextFour={item?.topPerformanceTextFour}
                      topPerformanceTextFive={item?.topPerformanceTextFive}
                      topPerformanceTextSix={item?.topPerformanceTextSix}
                      topPerformanceTextSeven={item?.topPerformanceTextSeven}
                    />
                  </Box>
                ))}
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
                <Box marginLeft={2}>
                  <AnnouncementHeader />
                </Box>
                <Box>
                  {announcementDashboardCardData?.map((item, index) => (
                    <Box key={uuidv4()}>
                      <AnnouncementDashboardCard
                        icon={item?.icon}
                        announcementText={item?.announcementText}
                        announcementTextOne={item?.announcementTextOne}
                        announcementTextTwo={item?.announcementTextTwo}
                        isborderbottom={
                          announcementDashboardCardData?.length - 1 !== index
                        }
                      />
                    </Box>
                  ))}
                </Box>
                <Box display={'flex'} justifyContent={'center'}>
                  <Button variant="text">View All</Button>
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
