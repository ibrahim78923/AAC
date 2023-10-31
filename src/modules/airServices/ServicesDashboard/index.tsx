import { HeaderDashboard } from '@/modules/airServices/ServicesDashboard/HeaderDashboard';
import { RecentActivitiesDashboardCard } from '@/modules/airServices/ServicesDashboard/RecentActivitiesDashboardCard';
import { TicketDashboardCards } from '@/modules/airServices/ServicesDashboard/TicketDashboardCards';
import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import FirstAidKit from '@/assets/images/modules/superAdmin/dashboard/FirstAidKit.png';
import SecondAidKit from '@/assets/images/modules/superAdmin/dashboard/SecondAidKit.png';
import ThirdAidKit from '@/assets/images/modules/superAdmin/dashboard/ThirdAidKit.png';
import FourAidKit from '@/assets/images/modules/superAdmin/dashboard/FourAidKit.png';
import FifthAidKit from '@/assets/images/modules/superAdmin/dashboard/FiveAidKit.png';
import Clipboard from '@/assets/images/modules/LogitechMouse/clipboard-tick-dashboard.png';
import AnnouncementAvatar from '@/assets/images/modules/LogitechMouse/AnnouncementAvatar.png';
import { AnnouncementDashboardCard } from '@/modules/airServices/ServicesDashboard/AnnouncementDashboardCard';
import { TopPerformerDashboardCard } from '@/modules/airServices/ServicesDashboard/TopPerformerDashboardCard';
import TopPerformanceImage from '@/assets/images/modules/LogitechMouse/CustomerWowChampion.png';
import TopPerformanceImageTwo from '@/assets/images/modules/LogitechMouse/MostValuablePlayer.png';
import TopPerformaceAvatar from '@/assets/images/modules/LogitechMouse/Avatar.png';
import { CustomChart } from '@/components/Chart';
import { v4 as uuidv4 } from 'uuid';

const data = [
  { icon: FirstAidKit, count: '15', label: 'Overdue' },
  { icon: SecondAidKit, count: '06', label: 'Due Today' },
  { icon: ThirdAidKit, count: '13', label: 'Unresolved' },
  { icon: FourAidKit, count: '04', label: 'OnHold' },
  { icon: FifthAidKit, count: '24', label: 'Open Tickets' },
];

const dataone = [
  {
    icon: Clipboard,
    recentactivitytext: ' Updated ticket Request for',
    recentactivitytextone: 'Password Reset (#SR-24) to Service Request',
    recentactivitytexttwo: 'Tue, 7 Mar, 2023 10:31 PM',
  },
  {
    icon: Clipboard,
    recentactivitytext: ' Updated ticket Request for',
    recentactivitytextone: 'Password Reset (#SR-24) to Service Request',
    recentactivitytexttwo: 'Tue, 7 Mar, 2023 10:31 PM',
  },
  {
    icon: Clipboard,
    recentactivitytext: ' Updated ticket Request for',
    recentactivitytextone: 'Password Reset (#SR-24) to Service Request',
    recentactivitytexttwo: 'Tue, 7 Mar, 2023 10:31 PM',
  },
  {
    icon: Clipboard,
    recentactivitytext: ' Updated ticket Request for',
    recentactivitytextone: 'Password Reset (#SR-24) to Service Request',
    recentactivitytexttwo: 'Tue, 7 Mar, 2023 10:31 PM',
  },
];

const datatwo = [
  {
    icon: AnnouncementAvatar,
    Announcementtext: ' We are excited to announce that..',
    Announcementtextone: '3 hours ago',
    Announcementtexttwo: 'Kyle Jenner',
  },
  {
    icon: AnnouncementAvatar,
    Announcementtext: ' We are excited to announce that..',
    Announcementtextone: '3 hours ago',
    Announcementtexttwo: 'Kyle Jenner',
  },
  {
    icon: AnnouncementAvatar,
    Announcementtext: ' We are excited to announce that..',
    Announcementtextone: '3 hours ago',
    Announcementtexttwo: 'Kyle Jenner',
  },
];

const datathree = [
  {
    icon: TopPerformaceAvatar,
    topperformancetext: ' Alesha Rai',
    topperformancetextone: 'IT Department',
    topperformancetexttwo: 'Beginner',
    topperformancetextthree: 'Score + 2400 points to intermediate',
    topperformancetextfour: 'Customer Wow Champion',
    topperformancetextfive: 'Most Valuable Player',
    iconone: TopPerformanceImage,
    icontwo: TopPerformanceImageTwo,
  },
];
const barseries: any = [
  {
    data: [12, 3, 40, 30, 5, 30],
  },
  {
    data: [44, 55, 41, 64, 22, 43, 21],
  },
  {
    data: [53, 32, 33, 52, 13, 44, 32],
  },
  {
    data: [12, 3, 40, 30, 5, 10],
  },
];
interface ApexOptions {
  labels: string[];
  colors: string[];
}
const baroptions: ApexOptions = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  colors: ['#FFC20E', '#FF4A4A', '#35A275', '#0AADC7'],
};

const barseriesone: any = [44, 55];
const baroptionsone: ApexOptions = {
  labels: ['New', 'Blacklisted'],
  colors: ['#FFC20E', '#FF4A4A'],
};

const ServicesDashboard = () => {
  return (
    <div>
      <HeaderDashboard />
      <br />
      <Box sx={{ display: 'flex', gap: 1 }}>
        {data?.map(({ icon, count, label }) => (
          <Box key={uuidv4()} flex={1}>
            <TicketDashboardCards icon={icon} count={count} label={label} />
          </Box>
        ))}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={8} sx={{ marginTop: 2 }}>
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
                  <CustomChart
                    key={uuidv4()}
                    options={baroptions}
                    series={barseries}
                    type="bar"
                    height={250}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} sx={{ marginTop: 2 }}>
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
                  {dataone?.map(
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
                          isborderbottom={dataone?.length - 1 !== index}
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
          <Grid container spacing={2}>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
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
                  <CustomChart
                    key={uuidv4()}
                    options={baroptionsone}
                    series={barseriesone}
                    type="pie"
                    height={250}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box>
                {datathree?.map(
                  ({
                    topperformancetext,
                    topperformancetextone,
                    topperformancetexttwo,
                    topperformancetextthree,
                    topperformancetextfour,
                    topperformancetextfive,
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
                      />
                    </Box>
                  ),
                )}
              </Box>
            </Grid>
            <Grid item xs={4}>
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
                  {datatwo?.map(
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
                          isborderbottom={datatwo?.length - 1 !== index}
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

export default ServicesDashboard;
