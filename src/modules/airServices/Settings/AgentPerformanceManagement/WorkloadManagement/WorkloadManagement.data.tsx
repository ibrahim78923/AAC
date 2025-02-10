import { AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { RolesAndPermissions } from './RolesAndPermissions';
import { WorkloadSchedule } from './WorkloadSchedule';

export const workloadManagementTabs = [
  {
    _id: 1,
    name: 'Roles and Permissions',
    id: 'rolesAndPermissions',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.VIEW_ROLES_AND_PERMISSIONS,
    ],
    component: RolesAndPermissions,
  },
  {
    _id: 2,
    name: 'Workload Schedule',
    id: 'workloadSchedule',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.VIEW_CREATE_EDIT_DELETE_WORK_SCHEDULED_FOR_AGENTS,
    ],
    component: WorkloadSchedule,
  },
];
