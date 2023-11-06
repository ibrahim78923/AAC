import { UserAvatarImage } from '@/assets/images';
export const dashboardCheckboxData = [
  'Graphical Representation of Tickets by Statuses',
  'Recent Activities',
  'Announcements',
  'Tickets Overview by Status',
  'Tickets by Priority',
  'Achievements',
  'Agent Availability',
];
//using uuid here for testing purposes not for putting in map key
export const userData = [
  { name: 'Alee Javed', src: UserAvatarImage, id: '1' },
  { name: 'Rajvir Hundal', src: UserAvatarImage, id: '2' },
  { name: 'Ben Stock', src: UserAvatarImage, id: '3' },
  { name: 'Aleesha Kong', src: UserAvatarImage, id: '4' },
];
export const previewDashboard: { [index: string]: any } = {
  'Graphical Representation of Tickets by Statuses':
    'Graphical Representation of Tickets by Statuses',
  'Recent Activities': 'Recent Activities',
  Announcements: 'Announcements',
  'Tickets Overview by Status': 'Tickets Overview by Status',
  'Tickets by Priority': 'Tickets by Priority',
  Achievements: 'Achievements',
  'Agent Availability': 'Agent Availability',
};

export const createDashboardDefaultValue = {
  dashboardName: '',
  default: false,
  dashboardItems: [],
};
