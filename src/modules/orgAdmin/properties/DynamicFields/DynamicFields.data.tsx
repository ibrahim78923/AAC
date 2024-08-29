import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

export const dataArray = [
  {
    componentProps: {
      name: 'title',
      label: 'Title',
      placeholder: 'John Allen',
      required: true,
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'campaignOwner',
      label: 'Campaign Owner',
      fullWidth: true,
      select: true,
    },
    options: [{ value: '1', label: 'John Allen' }],
    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
    },

    component: RHFDatePicker,

    md: 12,
  },
  {
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
    },

    component: RHFDatePicker,

    md: 12,
  },
  {
    componentProps: {
      name: 'campaignGoal',
      label: 'Campaign Goal',
      placeholder: 'Get 5k likes on instagram',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'campaignAudience',
      label: 'Campaign Audience',
      placeholder: 'Instagram influencers',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'campaignBudget',
      label: 'Campaign Budget',
      placeholder: '£20.105.00',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'campaignStatus',
      label: 'campaign Status',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'scheduled', label: 'Scheduled' },
      { value: 'inprogress', label: 'In Progress' },
      { value: 'active', label: 'Active' },
      { value: 'paused', label: 'Paused' },
      { value: 'completed', label: 'Completed' },
    ],

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: '',
      fullWidth: true,
      placeholder: 'This campaign is created to market our instagram page',
    },
    component: RHFEditor,
    md: 12,
  },
];

export const predefinedVendorDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'name',
      label: 'Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'contactName',
      label: 'Contact Name',
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'phone',
      label: 'Phone',
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'mobile',
      label: 'Mobile',
    },
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      name: 'email',
      label: 'Email',
    },
    component: RHFTextField,
  },
  {
    id: 6,
    componentProps: {
      name: 'description',
      label: 'Description',
      multiline: true,
      minRows: 3,
    },
    component: RHFTextField,
  },
  {
    id: 7,
    componentProps: {
      name: 'address',
      label: 'Address',
      multiline: true,
      minRows: 3,
    },
    component: RHFTextField,
  },
  {
    id: 8,
    componentProps: {
      name: 'country',
      label: 'Country',
    },
    component: RHFTextField,
  },
  {
    id: 9,
    componentProps: {
      name: 'state',
      label: 'State',
    },
    component: RHFTextField,
  },
  {
    id: 10,
    componentProps: {
      name: 'city',
      label: 'City',
    },
    component: RHFTextField,
  },
  {
    id: 11,
    componentProps: {
      name: 'zipCode',
      label: 'Zip Code',
    },
    component: RHFTextField,
  },
];
