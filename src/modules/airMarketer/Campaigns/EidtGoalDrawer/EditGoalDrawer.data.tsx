import { RHFTextField } from '@/components/ReactHookForm';
import { Typography } from '@mui/material';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  sessions: Yup?.string()?.required('Field is Required'),
  newContacts: Yup?.string()?.trim()?.required('Field is Required'),
  influencedContacts: Yup?.string()?.required('Field is Required'),
  closedDeals: Yup?.string()?.required('Field is Required'),
  influencedRevenue: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  sessions: '',
  newContacts: '',
  influencedContacts: '',
  closedDeals: '',
  influencedRevenue: '',
};

export const dataArray = [
  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'body1',
      heading:
        'Please provide a target number for each metric. These goals will be shown alongside the corresponding , metrics in your campaign',
    },

    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'sessions',
      label: 'Sessions',
      fullWidth: true,
    },

    component: RHFTextField,

    md: 12,
  },
  {
    componentProps: {
      name: 'newContacts',
      label: 'New Contacts',
      fullWidth: true,
    },

    component: RHFTextField,

    md: 12,
  },
  {
    componentProps: {
      name: 'influencedContacts',
      label: 'Influenced Contacts',
      fullWidth: true,
    },

    component: RHFTextField,

    md: 12,
  },
  {
    componentProps: {
      name: 'closedDeals',
      label: 'Closed Deals',
      fullWidth: true,
    },

    component: RHFTextField,

    md: 12,
  },
  {
    componentProps: {
      name: 'influencedRevenue',
      label: 'Influenced Revenue',
      fullWidth: true,
    },

    component: RHFTextField,

    md: 12,
  },
];
