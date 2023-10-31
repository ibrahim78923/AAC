import { UserAvatarImage } from '@/assets/images';
import { v4 as uuidv4 } from 'uuid';

export const dashboardCheckboxData = [
  'Graphical Representation of Tickets by Statuses',
  'Projects',
  'Recent Activities',
  'Announcements',
  'Release Reports',
  'Tickets Overview by Status',
  'Tickets by Priority',
  'Software Reports',
  'Achievements',
  'Agent Availability',
];
export const userData = [
  { name: 'Alee Javed', src: UserAvatarImage, id: uuidv4() },
  { name: 'Rajvir Hundal', src: UserAvatarImage, id: uuidv4() },
  { name: 'Ben Stock', src: UserAvatarImage },
  { name: 'Aleesha Kong', src: UserAvatarImage, id: uuidv4() },
];
