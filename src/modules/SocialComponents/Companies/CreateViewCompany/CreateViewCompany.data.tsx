import {
  // RHFDatePicker,
  RHFRadioGroup,
  RHFSelect,
  RHFSwitchableDatepicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography, useTheme } from '@mui/material';

import * as Yup from 'yup';

export const createViwValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required'),
});

export const createViewDefaultValues = {
  name: '',
  industry: '',
  companyOwner: '',
  createdDate: null,
};

export const createViewArr = () => {
  const theme = useTheme();
  return [
    {
      componentProps: {
        name: 'name',
        label: 'Name',
        placeholder: 'Enter Name',
        required: true,
        fullWidth: true,
        select: false,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'industry',
        label: 'Industry',
        fullWidth: true,
        select: true,
      },
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'companyOwner',
        label: 'Company Owner',
        fullWidth: true,
        select: true,
      },
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'createdDate',
        label: 'Created Date',
        placeholder: 'Monday, January 30, 2023  12:50 PM',
        fullWidth: true,
      },
      component: RHFSwitchableDatepicker,
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
        name: 'sharedwithRadio',
        fullWidth: true,
        defaultValue: 'all',
        row: false,
        options: [
          { value: 'private', label: 'Private' },
          { value: 'myTeam', label: 'My Team (test)' },
          { value: 'everyone', label: 'Everyone' },
        ],
      },
      component: RHFRadioGroup,
      md: 12,
    },
  ];
};
