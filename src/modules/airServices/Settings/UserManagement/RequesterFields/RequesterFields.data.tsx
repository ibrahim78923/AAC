import {
  RHFAutocomplete,
  RHFDesktopDateTimePicker,
  RHFTextField,
} from '@/components/ReactHookForm';

export const predefinedRequesterDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'Enter Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'jobTitle',
      label: 'Job Title',
      placeholder: 'Job Title',
    },
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      name: 'phoneNumber',
      label: 'Phone Number',
      placeholder: 'Phone Number',
    },
    component: RHFTextField,
  },
  {
    id: 6,
    componentProps: {
      name: 'createdAt',
      label: 'Date of Request',
      fullWidth: true,
    },
    component: RHFDesktopDateTimePicker,
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
