import { Typography } from '@mui/material';

import {
  RHFTextField,
  RHFRadioGroup,
  RHFCheckbox,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  dashboardName: Yup?.string()?.trim()?.required('Field is Required'),
});

export const defaultValues = {
  dashboardName: '',
  accessDashboard: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'dashboardName',
      label: 'Dashboard Name',
      fullWidth: true,
      required: true,
      placeholder: 'Dashboard Name',
    },
    component: RHFTextField,
    md: 9,
  },

  {
    id: 1,
    componentProps: {
      name: 'accessDashboard',
      fullWidth: true,
      defaultValue: 'all',
      options: [
        {
          value: 'Private to owner(me)',
          label: 'Private to owner(me)',
        },
        {
          value: 'Everyone',
          label: 'Everyone',
        },
        {
          value: 'Only special user and teams',
          label: 'Only special user and teams',
        },
      ],
    },
    component: RHFRadioGroup,
    md: 12,
  },

  {
    componentProps: {
      varient: 'h4',
      heading: 'Use the checkboxes to remove/add any report you want',
    },
    gridLength: 8,

    component: Typography,
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
        'Total Deals, Open Deals, Team Goals, Closed Won, Published Quotes',
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
      name: 'ForecastpipelineReport',
      label: 'Forecast Pipeline report',
      fullWidth: true,
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    componentProps: {
      name: 'ForecastcategoryReport',
      label: 'Forecast Category reports',
      fullWidth: true,
    },
    component: RHFCheckbox,
    md: 12,
  },
];

export const createFormOptions = {
  everyOne: 'Everyone',
  accessDashboard: 'accessDashboard',
};
