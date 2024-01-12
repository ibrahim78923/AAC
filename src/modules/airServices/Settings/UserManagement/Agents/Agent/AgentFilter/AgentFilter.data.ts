import { RHFAutocomplete } from '@/components/ReactHookForm';
import { ROLE } from '@/constants/strings';

import * as Yup from 'yup';

const roleOptions = [ROLE?.ORG_AGENT];

export const validationSchemaAgentFilterFields = Yup?.object()?.shape({
  department: Yup?.string(),
  role: Yup?.string(),
});

export const defaultValuesAgentFilter = {
  department: '',
  role: '',
};

export const agentFilterFields = (departmentData: any) => [
  {
    id: 1,
    componentProps: {
      name: 'department',
      label: 'Department',
      fullWidth: true,
      placeholder: 'Select Department',
      options: departmentData?.map((item: any) => item?.name),
    },
    component: RHFAutocomplete,
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
