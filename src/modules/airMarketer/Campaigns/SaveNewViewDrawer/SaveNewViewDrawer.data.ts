import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography, useTheme } from '@mui/material';

import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  campaignStatus: Yup?.string()?.required('Field is Required'),
  startDate: Yup?.string()?.trim()?.required('Field is Required'),
  endDate: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  campaignStatus: '',
  startDate: null,
  endDate: null,
};

export const dataArray = () => {
  const theme = useTheme();
  return [
    {
      componentProps: {
        name: 'name',
        label: 'name',
        placeholder: 'John Allen',
        fullWidth: true,
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'campaignStatus',
        label: 'Campaign Status',
        fullWidth: true,
        required: true,
        placeholder: 'Select Campaign Status',
        options: ['scheduled', 'inprogress', 'active', 'paused', 'completed'],
      },

      component: RHFAutocomplete,

      md: 12,
    },
    {
      componentProps: {
        name: 'startDate',
        label: 'Start Date',
        fullWidth: true,
        required: true,
      },

      component: RHFDatePicker,

      md: 12,
    },
    {
      componentProps: {
        name: 'endDate',
        label: 'End Date',
        fullWidth: true,
        required: true,
      },

      component: RHFDatePicker,

      md: 12,
    },
    {
      componentProps: {
        color: theme?.palette?.grey[500],
        varient: 'h4',
        heading: 'Shared with',
      },
      gridLength: 12,
      component: Typography,
    },
    {
      componentProps: {
        name: 'sharedWith',
        fullWidth: true,
        defaultValue: 'all',
        row: false,
        options: [
          { value: 'private', label: 'Private' },
          { value: 'specific user or team', label: 'My Team (test)' },
          { value: 'everyone', label: 'Everyone' },
        ],
      },
      component: RHFRadioGroup,
      md: 12,
    },
  ];
};
export const teamsArr = [
  {
    label: 'Marketing Team',
    value: 'marketingTeam',
  },
  {
    label: 'Team Alpha',
    value: 'teamAlpha',
  },
  {
    label: 'Team Bravo',
    value: 'teamBravo',
  },
];
export const usersArr = [
  {
    label: 'Zahir Abbas',
    value: 'zahirAbbas',
  },
  {
    label: 'Sir Usman',
    value: 'sirUsman',
  },
];
export const specificUserOrTeamOptions = {
  specificUserOrTeam: 'specificUserOrTeam',
};
