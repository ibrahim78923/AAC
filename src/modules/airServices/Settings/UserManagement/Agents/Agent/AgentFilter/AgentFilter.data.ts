import { RHFAutocomplete } from '@/components/ReactHookForm';

import * as Yup from 'yup';

const departmentOptions = [
  {
    value: 'The Designer Team',
    label: 'The Designer Team',
  },
  {
    value: 'Developers Team',
    label: 'Developers Team',
  },
  {
    value: 'Handlers',
    label: 'Handlers',
  },
];
const roleOptions = [
  {
    value: 'The Designer Team',
    label: 'The Designer Team',
  },
  {
    value: 'Developers Team',
    label: 'Developers Team',
  },
  {
    value: 'Handlers',
    label: 'Handlers',
  },
];

export const validationSchemaAgentFilterFields = Yup?.object()?.shape({
  department: Yup?.string(),
  role: Yup?.string(),
});

export const defaultValuesAgentFilter = {
  department: '',
  role: '',
};

export const agentFilterFields = [
  {
    id: 1,
    componentProps: {
      name: 'department',
      label: 'Department',
      fullWidth: true,
      placeholder: 'Select Department',
      options: departmentOptions,
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
