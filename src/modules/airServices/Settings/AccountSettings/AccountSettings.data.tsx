// import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { AIR_SERVICES } from '@/constants';
export const accountSettings = [
  {
    id: 1,
    avatar: AccountCircleIcon,
    type: 'Account Details',
    link: AIR_SERVICES?.ACCOUNT_DETAILS_SETTINGS,
  },
  //TODO: comment for demo
  // {
  //   id: 2,
  //   avatar: MarkEmailUnreadIcon,
  //   type: 'Email Notification',
  //   link: AIR_SERVICES?.EMAIL_NOTIFICATION_SETTINGS,
  // },
  // {
  //   id: 3,
  //   avatar: SettingsIcon,
  //   type: 'Manage Portal Setting',
  //   link: AIR_SERVICES?.MANAGE_PORTAL_SETTINGS,
  // },
];
