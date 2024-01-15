import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { Typography } from '@mui/material';

const optionsVisible = [' Birthday', 'Color', 'Date'];
export const giftCardFormFields = [
  {
    id: 6,
    componentProps: {
      color: 'slateBlue.main',
      variant: 'h4',
      bgcolor: 'primary.lighter',
      p: 0.5,
    },
    heading: 'General',
    md: 12,
    component: Typography,
  },
  {
    id: 1,
    componentProps: {
      name: 'name',
      label: 'Name',
      placeholder: 'Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 8,
  },
  {
    id: 2,
    componentProps: {
      name: 'expirationDate',
      label: 'Expiration Date',
      placeholder: 'Enter Expiration Date',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 8,
  },
  {
    id: 3,
    componentProps: {
      name: 'maximumAmount',
      label: 'Maximum Amount',
      fullWidth: true,
      placeholder: 'e.g 5000',
    },
    component: RHFTextField,
    md: 8,
  },
  {
    id: 4,
    componentProps: {
      name: 'rewardAttribute',
      label: 'Reward Attribute',
      options: optionsVisible,
      multiple: true,
    },
    component: RHFAutocomplete,
    md: 8,
  },
];
