import {
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  compaignStatus: Yup?.string()?.required('Field is Required'),
  startDate: Yup?.string()?.trim()?.required('Field is Required'),
  endDate: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  compaignStatus: '',
  startDate: '',
  endDate: '',
};

export const dataArray = [
  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'h4',
      heading:
        'Export the data from your campaigns dashboard into a spreadsheet. The exported file will be sent to the email address and also posted to your Notification Center',
    },

    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
    },

    component: RHFTextField,

    md: 12,
  },
  {
    componentProps: {
      name: 'format',
      label: 'Format',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'xlsx', label: 'XLSX' },
      { value: 'csv', label: 'CSV' },
      { value: 'xls', label: 'XLS' },
    ],

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'sendTo',
      label: 'Send To',
      fullWidth: true,
    },

    component: RHFTextField,

    md: 12,
  },
  {
    componentProps: {
      name: '',
      fullWidth: true,
      defaultValue: 'all',
      options: [
        {
          value: 'Datafromthecurrentviewofcampaigndashboard',
          label: 'Data from the current view of campaign dashboard',
        },
        {
          value: 'Alldatafromcampaigndashboard',
          label: 'All data from campaign dashboard',
        },
      ],
    },
    component: RHFRadioGroup,
    md: 12,
  },
  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'h4',
      heading:
        'Note: Only data available from the campaigns dashboard can be included in the export',
    },

    gridLength: 12,
    component: Typography,
  },
];
