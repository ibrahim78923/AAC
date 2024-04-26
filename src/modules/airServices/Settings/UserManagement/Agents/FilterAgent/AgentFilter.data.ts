import { RHFAutocompleteAsync } from '@/components/ReactHookForm';

export const defaultValuesAgentFilter = (data: any) => {
  return {
    departmentId: data?.departmentId ?? null,
    permissionsRole: data?.permissionsRole ?? null,
  };
};

export const agentFilterFields = (
  apiQueryDepartment: any,
  roleApiQuery: any,
  roleApiQueryParams: any,
) => [
  {
    id: 7,
    componentProps: {
      name: 'departmentId',
      label: 'Department',
      fullWidth: true,
      apiQuery: apiQueryDepartment,
      placeholder: 'Select Department',
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 6,
    componentProps: {
      fullWidth: true,
      name: 'permissionsRole',
      label: 'Role',
      placeholder: 'Select Role',
      apiQuery: roleApiQuery,
      externalParams: roleApiQueryParams,
    },
    component: RHFAutocompleteAsync,
  },
];
