import LanIcon from '@mui/icons-material/Lan';
import { AIR_SERVICES } from '@/constants';
import { AgentsIcon, RequesterIcon, RolesIcon } from '@/assets/icons';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';
import { Permissions } from '@/constants/permissions';

export const userManagement = [
  {
    id: 1,
    avatar: LanIcon,
    type: 'Departments',
    link: AIR_SERVICES?.DEPARTMENT_SETTINGS,
    permissions: Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_DEPARTMENTS,
  },
  {
    id: 2,
    avatar: AgentsIcon,
    type: 'Agents',
    link: AIR_SERVICES?.AGENTS_SETTINGS,
    permissions: Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_AGENT,
  },
  {
    id: 3,
    avatar: RequesterIcon,
    type: 'Requesters',
    link: AIR_SERVICES?.REQUESTERS_SETTINGS,
    permissions:
      Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_REQUESTERS_VIEW_DETAILS,
  },
  {
    id: 4,
    avatar: ApartmentIcon,
    type: 'Department Fields',
    link: AIR_SERVICES?.DEPARTMENT_FIELD,
    permissions:
      Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_DEPARTMENT_FIELDS,
  },
  {
    id: 5,
    avatar: PersonIcon,
    type: 'Agent Fields',
    link: AIR_SERVICES?.AGENT_FIELDS,
    permissions:
      Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_AGENT_REQUESTER_FIELDS,
  },
  {
    id: 6,
    avatar: MarkEmailUnreadIcon,
    type: 'Requester Fields',
    link: AIR_SERVICES?.REQUESTER_FIELDS,
    permissions:
      Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_AGENT_REQUESTER_FIELDS,
  },
  {
    id: 7,
    avatar: RolesIcon,
    type: 'Roles',
    link: AIR_SERVICES?.USER_ROLES_SETTINGS,
    permissions: Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT,
  },
];
