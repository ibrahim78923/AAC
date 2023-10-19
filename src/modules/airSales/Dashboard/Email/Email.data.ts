import {
  RHFSelect,
  RHFTextField,
  RHFRadioGroup,
  RHFCheckbox,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  recurringEmail: Yup.string().trim().required('Field is Required'),
  internalRecipients: Yup.string().trim().required('Field is Required'),
  emailSubject: Yup.string().trim().required('Field is Required'),
  message: Yup.string().trim().required('Field is Required'),
  reportsInExport: Yup.string().trim().required('Field is Required'),
});

export const defaultValues = {
  recurringEmail: '',
  internalRecipients: '',
  emailSubject: '',
  message: '',
  reportsInExport: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'recurringEmail',
      label: 'Is this a recurring email ?',
      fullWidth: true,
      options: [
        'No, this email will only be sent once',
        'Yes, this is recurring email',
      ],
    },
    component: RHFRadioGroup,
    md: 12,
  },
  {
    componentProps: {
      name: 'internalRecipients',
      label: 'Internal Recipients',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'emailSubject',
      label: 'Email subject',
      fullWidth: true,
    },
    component: RHFTextField,
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
      name: 'reportsInExport',
      label: '',
      fullWidth: true,
      options: ['Include all reports', 'Include selected reports'],
    },
    component: RHFRadioGroup,
    md: 12,
  },
];
export const dataArraySelectedReports = [
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
];
