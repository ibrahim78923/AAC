import { UserAvatarImage } from '@/assets/images';
import { TicketDashboardCards } from '../PreviewDashboardItems/TicketDashboardCards';
import { TopPerformer } from '../PreviewDashboardItems/TopPerformer';
import { Announcements } from '../PreviewDashboardItems/Announcements';
import { TicketsByStatusBarChart } from '../PreviewDashboardItems/TicketsByStatusBarChart';
import { TicketsByPriorityRadialChart } from '../PreviewDashboardItems/TicketsByPriorityRadialChart';
import { RecentActivities } from '../PreviewDashboardItems/RecentActivities';
import { AgentAvailability } from '../PreviewDashboardItems/AgentAvailability';

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
  { name: 'Alee Javed', src: UserAvatarImage, id: '1' },
  { name: 'Rajvir Hundal', src: UserAvatarImage, id: '2' },
  { name: 'Ben Stock', src: UserAvatarImage, id: '3' },
  { name: 'Aleesha Kong', src: UserAvatarImage, id: '4' },
];
export const previewDashboard: { [index: string]: any } = {
  'Graphical Representation of Tickets by Statuses': (
    <TicketsByStatusBarChart />
  ),
  'Recent Activities': <RecentActivities />,
  Achievements: <TopPerformer />,
  'Tickets Overview by Status': <TicketDashboardCards />,
  'Tickets by Priority': <TicketsByPriorityRadialChart />,
  Announcements: <Announcements />,
  'Agent Availability': <AgentAvailability />,
};

export const createDashboardDefaultValue = {
  dashboardName: '',
  default: false,
  dashboardItems: [],
};
