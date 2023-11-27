import LanIcon from '@mui/icons-material/Lan';
import { AIR_SERVICES } from '@/constants';
import { AgentsIcon, RequesterIcon, RolesIcon } from '@/assets/icons';

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
    type: 'Requester',
    link: AIR_SERVICES?.REQUESTERS_SETTINGS,
  },
  {
    id: 4,
    avatar: RolesIcon,
    type: 'Roles',
    link: AIR_SERVICES?.USER_ROLES_SETTINGS,
  },
];
