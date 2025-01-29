import { RoleListDropdown } from '../AgentFormFields/RoleListDropdown';
import { DepartmentListDropdown } from '../AgentFormFields/DepartmentListDropdown';

export const defaultValuesAgentFilter = (data: any) => {
  return {
    departmentId: data?.departmentId ?? null,
    permissionsRole: data?.permissionsRole ?? null,
  };
};

export const agentFilterFields = [
  {
    _id: 7,
    component: DepartmentListDropdown,
  },
  {
    _id: 6,
    component: RoleListDropdown,
  },
];
