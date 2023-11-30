import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const userValidationSchema = Yup?.object()?.shape({
  userName: Yup?.string()?.required('Field is Required'),
  department: Yup?.string(),
  userAssignedDate: Yup?.date(),
  userFirstSeen: Yup?.string()?.required('Field is Required'),
  userLastSeen: Yup?.string()?.required('Field is Required'),
});

export const userDefaultValues = {
  userName: '',
  department: '',
  userFirstSeen: '',
  userLastSeen: '',
  userAssignedDate: new Date(),
};

export const userDataArray = [
  {
    componentProps: {
      name: 'userName',
      label: 'Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'department',
      label: 'Department',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'System Administration', label: 'System Administration' },
      { value: 'Quality Assurance', label: 'Quality Assurance' },
      { value: 'Business Intelligence', label: 'Business Intelligence' },
      {
        value: 'Infrastructure and Cloud Services',
        label: 'Infrastructure and Cloud Services',
      },
      { value: 'Telecommunications', label: 'Telecommunications' },
    ],

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'userAssignedDate',
      label: 'Assigned date',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'None', label: 'None' },
      { value: 'All Time', label: 'All Time' },
      { value: 'Today', label: 'Today' },
      { value: 'Yesterday', label: 'Yesterday' },
      { value: 'Previous week', label: 'Previous week' },
      { value: 'Previous Month', label: 'Previous Month' },
      { value: 'Next week', label: 'Next week' },
      { value: 'Next Month', label: 'Next Month' },
    ],

    component: RHFSelect,

    md: 12,
  },

  {
    componentProps: {
      name: 'userFirstSeen',
      label: 'First Seen',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'userLastSeen',
      label: 'Last Seen',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
