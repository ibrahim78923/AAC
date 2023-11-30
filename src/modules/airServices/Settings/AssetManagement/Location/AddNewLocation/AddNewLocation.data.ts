import * as yup from 'yup';
import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { Typography } from '@mui/material';

export const parentLocationOptions = [
  {
    value: 'america',
    label: 'America',
  },
  {
    value: 'asia',
    label: 'Asia',
  },
  {
    value: 'europe',
    label: 'Europe',
  },
];

export const validationSchemaAddNewLocation: any = yup?.object()?.shape({
  locationName: yup?.string()?.required('Required field!'),
  parentLocation: yup?.string(),
  contactName: yup?.string(),
  email: yup?.string(),
  phone: yup?.string(),
  addressLine1: yup?.string(),
  addressLine2: yup?.string(),
  city: yup?.string(),
  country: yup?.string(),
  state: yup?.string(),
  zipCode: yup?.string(),
});

export const defaultValues = {
  locationName: '',
  parentLocation: '',
  contactName: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  country: '',
  state: '',
  zipCode: '',
};

export const addNewLocationDataFields = [
  {
    id: 1,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'locationName',
      label: 'Location Name',
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 2,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'parentLocation',
      label: 'Parent Location',
      options: parentLocationOptions,
    },
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 3,
    componentProps: {
      fullWidth: true,
      name: 'contactName',
      label: 'Contact Name',
    },
    component: RHFTextField,
    gridLength: 6,
    md: 6,
  },
  {
    id: 4,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'email',
      label: 'Email',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 5,
    componentProps: {
      fullWidth: true,
      name: 'phone',
      label: 'Phone',
    },
    component: RHFTextField,
    gridLength: 6,
  },
  {
    id: 6,
    componentProps: {
      variant: 'h4',
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: '1.875rem',
    },
    heading: 'Address',
    gridLength: 12,
    component: Typography,
  },
  {
    id: 7,
    componentProps: {
      fullWidth: true,
      name: 'addressLine1',
      label: 'Address Line 1',
    },
    gridLength: 6,
    md: 6,
    component: RHFTextField,
  },
  {
    id: 8,
    componentProps: {
      fullWidth: true,
      name: 'addressLine2',
      label: 'Address Line 2',
    },
    gridLength: 6,
    md: 6,
    component: RHFTextField,
  },
  {
    id: 9,
    componentProps: {
      fullWidth: true,
      name: 'city',
      label: 'City',
    },
    gridLength: 6,
    md: 6,
    component: RHFTextField,
  },
  {
    id: 10,
    componentProps: {
      fullWidth: true,
      name: 'country',
      label: 'Country',
    },
    component: RHFTextField,
    gridLength: 6,
    md: 6,
  },
  {
    id: 11,
    componentProps: {
      fullWidth: true,
      name: 'state',
      label: 'State',
    },
    component: RHFTextField,
    gridLength: 6,
    md: 6,
  },
  {
    id: 12,
    componentProps: {
      fullWidth: true,
      name: 'zipCode',
      label: 'Zip Code',
    },
    component: RHFTextField,
    gridLength: 6,
    md: 6,
  },
];
