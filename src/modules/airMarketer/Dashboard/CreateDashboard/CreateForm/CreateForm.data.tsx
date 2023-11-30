import { Typography } from '@mui/material';

import {
  RHFTextField,
  RHFRadioGroup,
  RHFCheckbox,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  dashboardName: Yup?.string()?.trim()?.required('Field is Required'),
  accessDashboard: Yup?.string()?.trim()?.required('Field is Required'),
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
    },
    component: RHFTextField,
    md: 9,
  },
  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'h4',
      heading: 'Who can access this dashboard?',
    },
    gridLength: 8,

    component: Typography,
  },

  {
    componentProps: {
      name: 'accessDashboard',
      fullWidth: true,
      options: [
        { label: 'Private to owner(me)', value: 'Privatetoowner(me)' },
        { label: 'Everyone', value: 'Everyone' },
        {
          label: 'Only special user and teams',
          value: 'Onlyspecialuserandteams',
        },
      ],
      row: false,
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
export const userAndTeams = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
];
export const viewAndEditOptions = [
  { value: 'Viewandedit', label: 'View and edit' },
  { value: 'ViewOnly', label: 'View Only' },
];
