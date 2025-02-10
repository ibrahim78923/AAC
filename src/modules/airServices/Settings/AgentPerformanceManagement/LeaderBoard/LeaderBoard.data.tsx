import { AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import AwardPoints from './AwardPoints';
import AgentLevels from './AgentLevels';

export const leaderBoardTabs = [
  {
    _id: 1,
    name: 'Award Points',
    id: 'awardPoints',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.VIEW_AND_SET_AWARD_POINTS,
    ],
    component: AwardPoints,
  },
  {
    _id: 2,
    name: 'Agent Levels',
    id: 'agentLevels',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.VIEW_AND_MANAGE_AGENT_LEVELS_POINTS,
    ],
    component: AgentLevels,
  },
];
