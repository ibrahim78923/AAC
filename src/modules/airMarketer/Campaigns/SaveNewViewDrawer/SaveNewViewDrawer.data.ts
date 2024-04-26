import {
  RHFDatePicker,
  RHFRadioGroup,
  RHFSelect,
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
        name: 'campaignStatus',
        label: 'Campaign Status',
        fullWidth: true,
        select: true,
      },

      options: [
        { value: 'scheduled', label: 'Scheduled' },
        { value: 'inProgress', label: 'InProgress' },
        { value: 'active', label: 'Active' },
        { value: 'active', label: 'Active' },
        { value: 'paused', label: 'Paused' },
        { value: 'completed', label: 'Completed' },
      ],

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
          { value: 'PRIVATE', label: 'Private' },
          { value: 'TEAM', label: 'My Team (test)' },
          { value: 'EVERYONE', label: 'Everyone' },
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
