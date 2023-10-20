import {
  RHFSelect,
  RHFTextField,
  RHFRadioGroup,
  RHFCheckbox,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  recurringEmail: Yup.string().trim().required('Field is Required'),
  internalRecipients: Yup.string().trim().required('Field is Required'),
  emailSubject: Yup.string().trim().required('Field is Required'),
  message: Yup.string().trim().required('Field is Required'),
  reportsInExport: Yup.string().trim().required('Field is Required'),
  downloadableFile: Yup.string().trim().required('Field is Required'),
});

export const defaultValues = {
  recurringEmail: '',
  internalRecipients: '',
  emailSubject: '',
  message: '',
  reportsInExport: '',
  downloadableFile: '',
};

export const dataArray = [
  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'h4',
      heading: 'Is this a recurring email ?',
    },
    gridLength: 12,

    component: Typography,
  },

  {
    componentProps: {
      name: 'recurringEmail',
      fullWidth: true,
      row: false,
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
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'message',
      fullWidth: true,
      placeholder: 'Message',
      multiline: true,
      rows: 3,
    },
  },
  {
    componentProps: {
      name: 'downloadableFile',
      label: 'Attach downloadable file',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'pdf', label: 'Pdf' },
      { value: 'excel', label: 'Excel' },
      { value: 'xls', label: 'XLS' },
    ],

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'h4',
      heading: 'Reports in export',
    },
    gridLength: 12,

    component: Typography,
  },
  {
    componentProps: {
      name: 'reportsInExport',
      label: '',
      fullWidth: true,
      row: false,
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
