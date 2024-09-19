import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { indexNumbers } from '@/constants';
import { Typography, useTheme } from '@mui/material';

import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required'),
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
        label: 'Name',
        placeholder: 'Enter name',
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
        placeholder: 'Select campaign status',
        options: ['scheduled', 'inprogress', 'active', 'paused', 'completed'],
        getOptionLabel: (option: any) =>
          option?.charAt(indexNumbers?.ZERO)?.toUpperCase() +
          option?.slice(indexNumbers?.ONE),
      },

      component: RHFAutocomplete,

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
        row: false,
        defaultValue: 'everyone',
        options: [
          { value: 'private', label: 'Private' },
          { value: 'specific user or team', label: 'My Team' },
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
