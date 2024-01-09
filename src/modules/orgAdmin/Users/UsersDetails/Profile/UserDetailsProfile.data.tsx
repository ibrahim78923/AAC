import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import { Typography } from '@mui/material';

import * as Yup from 'yup';

export const profileValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('Field is Required'),
  lastName: Yup.string().required('Field is Required'),
  postCode: Yup.string().required('Field is Required'),
  address: Yup.string().required('Field is Required'),
});

export const profileFields = [
  {
    componentProps: {
      label: 'First Name',
      name: 'firstName',
      placeholder: 'Enter First Name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      label: 'Last Name',
      name: 'lastName',
      placeholder: 'Enter Last Name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      label: 'Phone Number',
      placeholder: 'Enter Number',
      name: 'phoneNumber',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      label: 'Email',
      placeholder: 'Enter Email',
      name: 'email',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      label: 'Job Title',
      name: 'jobTitle',
      placeholder: 'Enter Job Title',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    componentProps: {
      label: 'Post Code',
      name: 'postCode',
      placeholder: 'Enter Post Code',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    componentProps: {
      label: 'Address',
      name: 'address',
      placeholder: 'Enter Address',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      label: 'Flat/Unit',
      name: 'flat',
      placeholder: 'Enter Flat/Unit',
      fullWidth: true,
    },
    toShow: ['address'],
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      label: 'Building Name',
      name: 'buildingName',
      placeholder: 'Enter Building Name',
      fullWidth: true,
    },
    toShow: ['address'],
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      label: 'Building Number',
      name: 'buildingNumber',
      placeholder: 'Enter Building Number',
      fullWidth: true,
    },
    toShow: ['address'],
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      label: 'Street Name',
      name: 'streetName',
      placeholder: 'Enter Street Name',
      fullWidth: true,
    },
    toShow: ['address'],
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      label: 'Town/City',
      name: 'city',
      placeholder: 'Enter Town/City',
      fullWidth: true,
    },
    toShow: ['address'],
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      label: 'Country',
      name: 'country',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'pakistan', label: 'Pakistan' },
      { value: 'India', label: 'India' },
      { value: 'uk', label: 'UK' },
      { value: 'us', label: 'US' },
    ],
    component: RHFSelect,
    toShow: ['address'],
    md: 6,
  },
  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'h4',
      heading: 'Links',
    },

    gridLength: 12,
    component: Typography,
  },

  {
    componentProps: {
      label: 'Facebook URL',
      name: 'facebookUrl',
      placeholder: 'Enter Facebook URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    componentProps: {
      label: 'Twitter URL',
      name: 'twitterUrl',
      placeholder: 'Enter Twitter URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
];
