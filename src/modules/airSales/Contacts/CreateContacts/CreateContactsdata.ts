import {
  RHFDatePicker,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';

export const createContactsData = [
  {
    title: 'Email',
    componentProps: {
      name: 'Email',
      label: 'Enter Name',
    },
    component: RHFTextField,
  },

  {
    title: 'Profile Pictures',
    componentProps: {
      name: 'ProfilePictures',
      label: 'First Name',
      select: false,
    },
    component: RHFDropZone,
  },
  {
    title: 'Last Name',
    componentProps: {
      name: 'LastName',
      label: 'Enter LastName',
      type: 'number',
    },
    component: RHFTextField,
  },
  {
    title: 'Address',
    componentProps: {
      name: 'Address',
      label: 'Select',
    },
    component: RHFTextField,
  },
  {
    title: 'Date of Birth',
    componentProps: {
      name: 'DateofBirth',
      select: false,
    },
    component: RHFDatePicker,
  },
  {
    title: 'Phone Number',
    componentProps: {
      name: 'priority',
      label: 'Select',
      select: false,
    },
    component: RHFTextField,
  },
  {
    title: 'WhatsApp Number',
    componentProps: {
      name: 'WhatsAppNumber',
      label: 'WhatsApp Number',
      select: false,
    },
    component: RHFTextField,
  },
  {
    title: 'Contact Owner',
    componentProps: {
      name: 'ContactOwner',
      label: 'Select',
      select: false,
    },
    component: RHFTextField,
  },
  {
    title: 'Lifecycle Stage',
    componentProps: {
      name: 'Lifecycle Stage',
      label: 'Select',
      select: true,
    },
    options: [
      { value: 'Registering Pipeline', label: 'Registering Pipeline' },
      { value: 'Sales Pipeline', label: 'Sales Pipeline' },
      { value: 'Recruitment Pipeline', label: 'Recruitment Pipeline' },
      { value: 'Test Pipeline', label: 'Test Pipeline' },
    ],
    component: RHFTextField,
  },
  {
    title: 'Status',
    componentProps: {
      name: 'Status',
      label: 'Select',
      select: true,
    },
    options: [
      { value: 'Registering Pipeline', label: 'Registering Pipeline' },
      { value: 'Sales Pipeline', label: 'Sales Pipeline' },
      { value: 'Recruitment Pipeline', label: 'Recruitment Pipeline' },
      { value: 'Test Pipeline', label: 'Test Pipeline' },
    ],
    component: RHFTextField,
  },
  {
    title: 'Date of Joining',
    componentProps: {
      name: 'DateofJoining',
      select: false,
    },
    component: RHFDatePicker,
  },
];
