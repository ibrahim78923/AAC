import SuperAdminLayout from '@/layout/index';
import { Box } from '@mui/material';
import FirstAidKit from '@/assets/images/modules/superAdmin/dashboard/FirstAidKit.png';
import SecondAidKit from '@/assets/images/modules/superAdmin/dashboard/SecondAidKit.png';
import ThirdAidKit from '@/assets/images/modules/superAdmin/dashboard/ThirdAidKit.png';
import FourAidKit from '@/assets/images/modules/superAdmin/dashboard/FourAidKit.png';
import FifthAidKit from '@/assets/images/modules/superAdmin/dashboard/FiveAidKit.png';
import Clipboard from '@/assets/images/modules/LogitechMouse/clipboard-tick-dashboard.png';
import { TicketDashboardCards } from '@/components/TicketDashboardCards';
import { RecentActivitiesDashboardCard } from '@/components/RecentActivitiesDashboardCard';
import { AnnouncementDashboardCard } from '@/components/AnnouncementDashboardCard';
import AnnouncementAvatar from '@/assets/images/modules/LogitechMouse/AnnouncementAvatar.png';
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
  {
    icon: AnnouncementAvatar,
    Announcementtext: ' We are excited to announce that..',
    Announcementtextone: '3 hours ago',
    Announcementtexttwo: 'Kyle Jenner',
  },
];
const TestComponentsZainPage = () => {
  return (
    <>
      <>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {data?.map(({ icon, count, label }) => (
            <Box key={uuidv4()}>
              <TicketDashboardCards icon={icon} count={count} label={label} />
            </Box>
          ))}
        </Box>
      </>

      <>
        <br />
        <Box>
          {dataone?.map(
            ({
              recentactivitytext,
              recentactivitytextone,
              recentactivitytexttwo,
              icon,
            }) => (
              <Box key={uuidv4()}>
                <RecentActivitiesDashboardCard
                  icon={icon}
                  recentactivitytext={recentactivitytext}
                  recentactivitytextone={recentactivitytextone}
                  recentactivitytexttwo={recentactivitytexttwo}
                />
              </Box>
            ),
          )}
        </Box>
      </>

      <>
        <br />
        <Box key={uuidv4()}>
          {datatwo?.map(
            ({
              icon,
              Announcementtext,
              Announcementtextone,
              Announcementtexttwo,
            }) => (
              <Box key={uuidv4()}>
                <AnnouncementDashboardCard
                  icon={icon}
                  Announcementtext={Announcementtext}
                  Announcementtextone={Announcementtextone}
                  Announcementtexttwo={Announcementtexttwo}
                />
              </Box>
            ),
          )}
        </Box>
      </>
    </>
  );
};
TestComponentsZainPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
export default TestComponentsZainPage;
