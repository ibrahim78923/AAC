import { AIR_SERVICES } from '@/constants';
import {
  CannedResponseIcon,
  LeadersBoardIcon,
  WorkloadManagementIcon,
} from '@/assets/icons';
export const agentPerformanceManagement = [
  {
    id: 1,
    avatar: CannedResponseIcon,
    type: 'Canned Responses',
    purpose: `Pre-created replies and quickly respond to tickets`,
    link: AIR_SERVICES?.CANNED_RESPONSE_SETTINGS,
  },
  {
    id: 2,
    avatar: LeadersBoardIcon,
    type: 'Leader Board',
    purpose: `Setup a point-based system for affiliated ticket resolution`,
    link: AIR_SERVICES?.LEADER_BOARD_SETTINGS,
  },
  {
    id: 3,
    avatar: WorkloadManagementIcon,
    type: 'Workload Management',
    purpose: `Create and manage fields to capture information about projects`,
    link: AIR_SERVICES?.WORKLOAD_MANAGEMENT_SETTINGS,
  },
];
