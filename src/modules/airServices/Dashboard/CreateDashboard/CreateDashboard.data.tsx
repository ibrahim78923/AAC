import { UserAvatarImage } from '@/assets/images';
import { TicketCards } from '../PreviewDashboardItems/TicketCards';
import TicketsStatusAndActivities from '../PreviewDashboardItems/TicketsStatusAndActivities';
import DashboardCards from '../PreviewDashboardItems/DashboardCards';

export const dashboardCheckboxData = [
  'Tickets Overview by Status',
  'Tickets by Statuses and Recent Activities',
  'Announcements, Achievements and Agent Availability',
];
export const userData = [
  { name: 'Alee Javed', src: UserAvatarImage, id: '1' },
  { name: 'Rajvir Hundal', src: UserAvatarImage, id: '2' },
  { name: 'Ben Stock', src: UserAvatarImage, id: '3' },
  { name: 'Aleesha Kong', src: UserAvatarImage, id: '4' },
];
export const previewDashboard: { [index: string]: any } = {
  'Tickets Overview by Status': <TicketCards />,
  'Tickets by Statuses and Recent Activities': <TicketsStatusAndActivities />,
  'Announcements, Achievements and Agent Availability': <DashboardCards />,
};

export const createDashboardDefaultValue = {
  dashboardName: '',
  default: false,
  dashboardItems: [],
};
