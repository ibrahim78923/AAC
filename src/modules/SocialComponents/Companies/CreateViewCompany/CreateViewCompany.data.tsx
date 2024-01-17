import {
  RHFRadioGroup,
  RHFSelect,
  RHFSwitchableDatepicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography, useTheme } from '@mui/material';

import * as Yup from 'yup';
import useCreateCompany from '../CreateCompany/useCreateCompany';

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
  const { getCompanyContacts } = useCreateCompany();
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
      options: [
        { value: 'computerSoftware', label: 'Computer software' },
        { value: 'computerServices', label: 'Computer Services' },
        { value: 'construction', label: 'Construction' },
        { value: 'none', label: 'None' },
      ],
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
      options: getCompanyContacts?.data?.contacts?.map((item: any) => ({
        value: item?._id,
        label: `${item?.firstName} ${item?.lastName}`,
      })),
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
