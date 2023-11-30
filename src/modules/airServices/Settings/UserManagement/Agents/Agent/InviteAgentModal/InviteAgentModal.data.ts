import * as yup from 'yup';
import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { timeZone } from '@/constants/time-zone';

export const departmentData = [
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
export const roleData = [
  {
    value: 'Account Admin',
    label: 'Account Admin',
  },
  {
    value: 'Department Head',
    label: 'Department Head',
  },
  {
    value: 'HR Admin',
    label: 'HR Admin',
  },
];

export const validationSchemaAgentFields: any = yup?.object()?.shape({
  firstName: yup?.string(),
  lastName: yup?.string(),
  email: yup?.string(),
  phoneNumber: yup?.string(),
  department: yup?.string()?.required('Required field!'),
  role: yup?.string(),
  timezone: yup?.string(),
});

export const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
  role: '',
  timezone: '',
};

export const agentFieldsData = [
  {
    id: 1,
    componentProps: {
      name: 'firstName',
      fullWidth: true,
      placeholder: 'First Name',
      label: 'First Name',
    },
    gridLength: 5.6,
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'lastName',
      fullWidth: true,
      placeholder: 'Last Name',
      label: 'Last Name',
    },
    gridLength: 5.6,
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'email',
      fullWidth: true,
      placeholder: 'Email',
      label: 'Email',
    },
    gridLength: 12,
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'phoneNumber',
      fullWidth: true,
      placeholder: 'Phone Number',
      label: 'Phone Number',
    },
    gridLength: 12,
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      fullWidth: true,
      name: 'department',
      label: 'Department',
      placeholder: 'Select Department',
      options: departmentData,
      required: true,
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      fullWidth: true,
      name: 'role',
      label: 'Role',
      placeholder: 'Select Role',
      options: roleData,
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
  {
    id: 7,
    componentProps: {
      fullWidth: true,
      name: 'timeZone',
      label: 'Time Zone',
      placeholder: 'Select Time Zone',
      options: timeZone?.map((item: any) => ({
        label: item?.label,
        value: item?.label,
      })),
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
];
