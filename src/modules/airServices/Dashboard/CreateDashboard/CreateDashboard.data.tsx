import { UserAvatarImage } from '@/assets/images';
import { v4 as uuidv4 } from 'uuid';
import { RecentActivitiesDashboardCard } from './PreviewDashboardItems/RecentActivitiesDashboardCard';
import { AnnouncementDashboardCard } from './PreviewDashboardItems/AnnouncementDashboardCard';
import { TicketDashboardCards } from './PreviewDashboardItems/TicketDashboardCards';
import { TopPerformerDashboardCard } from './PreviewDashboardItems/TopPerformerDashboardCard';
export const dashboardCheckboxData = [
  'Graphical Representation of Tickets by Statuses',
  'Recent Activities',
  'Announcements',
  'Tickets Overview by Status',
  'Tickets by Priority',
  'Achievements',
  'Agent Availability',
];
export const userData = [
  { name: 'Alee Javed', src: UserAvatarImage, id: uuidv4() },
  { name: 'Rajvir Hundal', src: UserAvatarImage, id: uuidv4() },
  { name: 'Ben Stock', src: UserAvatarImage },
  { name: 'Aleesha Kong', src: UserAvatarImage, id: uuidv4() },
];
export const previewDashboard: { [index: string]: any } = {
  'Graphical Representation of Tickets by Statuses':
    'Graphical Representation of Tickets by Statuses',
  'Recent Activities': <RecentActivitiesDashboardCard />,
  Announcements: <AnnouncementDashboardCard />,
  'Tickets Overview by Status': <TicketDashboardCards />,
  'Tickets by Priority': 'Tickets by Priority',
  Achievements: <TopPerformerDashboardCard />,
  'Agent Availability': 'Agent Availability',
};
