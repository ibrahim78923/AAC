import LanIcon from '@mui/icons-material/Lan';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { AIR_SERVICES } from '@/constants';
export const userManagement = [
  {
    id: 1,
    avatar: LanIcon,
    type: 'Departments',
    link: AIR_SERVICES?.DEPARTMENT_SETTINGS,
  },
  {
    id: 2,
    avatar: MarkEmailUnreadIcon,
    type: 'Agents',
    link: AIR_SERVICES?.AGENTS_SETTINGS,
  },
  {
    id: 3,
    avatar: SettingsIcon,
    type: 'Requester',
    link: AIR_SERVICES?.REQUESTERS_SETTINGS,
  },
  {
    id: 4,
    avatar: AccountCircleIcon,
    type: 'Department Field',
    link: AIR_SERVICES?.DEPARTMENT_FIELD_SETTINGS,
  },
  {
    id: 5,
    avatar: MarkEmailUnreadIcon,
    type: 'User Field',
    link: AIR_SERVICES?.USER_FIELD_SETTINGS,
  },
  {
    id: 6,
    avatar: SettingsIcon,
    type: 'Roles',
    link: AIR_SERVICES?.USER_ROLES_SETTINGS,
  },
];
