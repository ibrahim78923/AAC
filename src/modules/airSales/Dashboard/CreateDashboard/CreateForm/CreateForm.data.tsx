import {
  RHFSelect,
  RHFTextField,
  RHFRadioGroup,
  RHFCheckbox,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  dashboardName: Yup.string().trim().required('Field is Required'),
  internalRecipients: Yup.string().trim().required('Field is Required'),
  emailSubject: Yup.string().trim().required('Field is Required'),
  message: Yup.string().trim().required('Field is Required'),
});

export const defaultValues = {
  dashboardName: '',
  internalRecipients: '',
  emailSubject: '',
  message: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'dashboardName',
      label: 'Dashboard Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'accessDashboard',
      label: 'Who can access this dashboard? *',
      fullWidth: true,
      options: [
        'Private to owner (me)',
        'Everyone',
        'Only special user and teams',
      ],
    },
    component: RHFRadioGroup,
    md: 12,
  },
  {
    componentProps: {
      name: 'closedAndCreatedDeals',
      label: 'Deals created vs Closed Deals',
      sx: { mb: 4 },
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    componentProps: {
      name: 'mettingDetails',
      label: 'Meeting Details',
      sx: { mb: 4 },
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    componentProps: {
      name: 'teamActivities',
      label: 'Team activities by activity date',
      sx: { mb: 4 },
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    componentProps: {
      name: 'totalDeals',
      label:
        'Total Deals, Open Deals, Team Goals, Cloded Won, Published Quotes',
      fullWidth: true,
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    componentProps: {
      name: 'dealReports',
      label: 'Deal reports',
      fullWidth: true,
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    componentProps: {
      name: 'message',
      label: 'Message',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'product',
      label: 'Product/Suite',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'airSales', label: 'Air Sales' },
      { value: 'airMarketer', label: 'Air Marketer' },
      { value: 'airOperations', label: 'Air Operations' },
      { value: 'airServices', label: 'Air Services' },
      { value: 'loyaltyProgram', label: 'Loyalty Program' },
    ],

    component: RHFSelect,

    md: 12,
  },

  {
    componentProps: {
      name: 'internalRecipients',
      label: 'Is this a recurring email ?',
      fullWidth: true,
      options: ['Yes', 'No'],
    },
    component: RHFRadioGroup,
    md: 12,
  },
];
