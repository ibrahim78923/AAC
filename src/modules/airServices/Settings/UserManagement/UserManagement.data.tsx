import LanIcon from '@mui/icons-material/Lan';
import { AIR_SERVICES } from '@/constants';
import { AgentsIcon, RequesterIcon, RolesIcon } from '@/assets/icons';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';

export const userManagement = [
  {
    id: 1,
    avatar: LanIcon,
    type: 'Departments',
    link: AIR_SERVICES?.DEPARTMENT_SETTINGS,
  },
  {
    id: 2,
    avatar: AgentsIcon,
    type: 'Agents',
    link: AIR_SERVICES?.AGENTS_SETTINGS,
  },
  {
    id: 3,
    avatar: RequesterIcon,
    type: 'Requesters',
    link: AIR_SERVICES?.REQUESTERS_SETTINGS,
  },
  {
    id: 4,
    avatar: AccountCircleIcon,
    type: 'Department Field',
    link: '',
  },
  {
    id: 5,
    avatar: MarkEmailUnreadIcon,
    type: 'User Field',
    link: '',
  },
  {
    id: 6,
    avatar: RolesIcon,
    type: 'Roles',
    link: AIR_SERVICES?.USER_ROLES_SETTINGS,
  },
];
