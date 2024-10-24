import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { Permissions } from '@/constants/permissions';
import { ISettingsCards } from '../Settings.interface';
import { AIR_SERVICES } from '@/constants/routes';

export const accountSettings: ISettingsCards[] = [
  {
    id: 1,
    avatar: AccountCircleIcon,
    type: 'Account Details',
    link: AIR_SERVICES?.ACCOUNT_DETAILS_SETTINGS,
    permissions:
      Permissions?.AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_ACCOUNT_DETAILS,
  },
  {
    id: 2,
    avatar: MarkEmailUnreadIcon,
    type: 'Email Notifications',
    link: AIR_SERVICES?.EMAIL_NOTIFICATION_SETTINGS,
    permissions: Permissions?.AIR_SERVICES_SETTINGS_EMAIL_NOTIFICATIONS,
  },
  {
    id: 3,
    avatar: SettingsIcon,
    type: 'Manage Portal Settings',
    link: AIR_SERVICES?.MANAGE_PORTAL_SETTINGS,
    permissions: Permissions?.AIR_SERVICES_SETTINGS_MANAGE_PORTAL_SETTINGS,
  },
];
