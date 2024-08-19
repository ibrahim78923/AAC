import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import Agent from './Agent';
import AgentRequest from './AgentRequest';

export const getAgentsTabsData = [
  {
    _id: 1,
    name: 'Agent',
    id: 'agent',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.VIEW_AGENTS_LIST,
    ],
    component: Agent,
  },
  {
    _id: 2,
    name: 'Agents Request',
    id: 'agentsRequest',
    component: AgentRequest,
    hasNoPermissions: true,
    tabPermissions: [],
  },
];
