import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

export const predefinedAgentDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'firstName',
      placeholder: 'First Name',
      label: 'First Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'lastName',
      placeholder: 'Last Name',
      label: 'Last Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'email',
      placeholder: 'Email',
      label: 'Email',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'phoneNumber',
      placeholder: 'Phone Number',
      label: 'Phone Number',
    },
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      name: 'departmentId',
      label: 'Department',
      placeholder: 'Select Department',
    },
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      name: 'permissionsRole',
      label: 'Role',
      placeholder: 'Select Role',
    },
    component: RHFAutocomplete,
  },
  {
    id: 7,
    componentProps: {
      name: 'timezone',
      label: 'Time Zone',
      placeholder: 'Select Time Zone',
    },
    component: RHFAutocomplete,
  },
];
