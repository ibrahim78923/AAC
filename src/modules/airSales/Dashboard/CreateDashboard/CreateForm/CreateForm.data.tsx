import {
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
  accessDashboard: Yup.string().trim().required('Field is Required'),
});

export const defaultValues = {
  dashboardName: '',
  internalRecipients: '',
  emailSubject: '',
  message: '',
  accessDashboard: '',
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
      label: 'Who can access this dashboard?',
      fullWidth: true,
      options: [
        'Private to owner(me)',
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
];
