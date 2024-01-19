import {
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup?.string()?.required('Field is Required'),
  format: Yup?.string()?.trim()?.required('Field is Required'),
  sendTo: Yup?.string()?.required('Field is Required'),
  closedDeals: Yup?.string()?.required('Field is Required'),
  influencedRevenue: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  name: '',
  format: '',
  sendTo: '',
  closedDeals: '',
  influencedRevenue: '',
};

export const dataArray = [
  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'body1',
      heading:
        'Export the data from your campaigns dashboard into a spreadsheet. The exported file will be sent to the email address and also posted to your Notification Center.',
    },

    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      placeholder: 'John Allen',
      required: true,
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
      placeholder: 'Example@airapplecart.co.uk',
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
      varient: 'body1',
      heading:
        'Note: Only data available from the campaigns dashboard can be included in the export',
    },
    gridLength: 12,
    component: Typography,
  },
];
