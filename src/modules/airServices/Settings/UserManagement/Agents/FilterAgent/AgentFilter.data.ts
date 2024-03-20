import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import { ROLE } from '@/constants/strings';

import * as Yup from 'yup';

const roleOptions = [ROLE?.ORG_AGENT];

export const validationSchemaAgentFilterFields = Yup?.object()?.shape({
  department: Yup?.mixed()?.nullable(),
  role: Yup?.mixed()?.nullable(),
});

export const defaultValuesAgentFilter = {
  department: null,
  role: null,
};

export const agentFilterFields = (apiQueryDepartment: any) => [
  {
    id: 7,
    componentProps: {
      name: 'department',
      label: 'Department',
      fullWidth: true,
      apiQuery: apiQueryDepartment,
      placeholder: 'Select Department',
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 2,
    componentProps: {
      name: 'role',
      label: 'Role',
      fullWidth: true,
      placeholder: 'Select Role',
      options: roleOptions,
    },
    component: RHFAutocomplete,
  },
];
