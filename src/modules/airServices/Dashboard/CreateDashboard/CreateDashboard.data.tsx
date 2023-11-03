import { UserAvatarImage } from '@/assets/images';
import { v4 as uuidv4 } from 'uuid';
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
  'Recent Activities': 'Recent Activities',
  Announcements: 'Announcements',
  'Tickets Overview by Status': 'Tickets Overview by Status',
  'Tickets by Priority': 'Tickets by Priority',
  Achievements: 'Achievements',
  'Agent Availability': 'Agent Availability',
};
