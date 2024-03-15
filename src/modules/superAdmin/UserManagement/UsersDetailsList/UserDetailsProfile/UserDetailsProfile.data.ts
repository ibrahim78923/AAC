import { Typography } from '@mui/material';

import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const profileValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('Field is Required'),
  lastName: Yup.string().required('Field is Required'),
  // postCode: Yup.string().required('Field is Required'),
  address: Yup.string().required('Field is Required'),
  facebookUrl: Yup.string()?.matches(
    /^(ftp|http|https):\/\/[^ "]+$/,
    'Please enter a valid URL',
  ),
  linkedInUrl: Yup.string()?.matches(
    /^(ftp|http|https):\/\/[^ "]+$/,
    'Please enter a valid URL',
  ),
});

export const profileFields = [
  {
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'Enter First Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter Last Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'phoneNumber',
      label: 'Phone Number',
      placeholder: 'Enter Phone',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter Email',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'jobTitle',
      label: 'Job Title',
      placeholder: 'Enter Job Title',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    componentProps: {
      name: 'postCode',
      label: 'Post Code',
      placeholder: 'Enter Post Code',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    componentProps: {
      name: 'compositeAddress',
      label: 'Address',
      placeholder: 'Enter Address',
      fullWidth: true,
      multiline: true,
      rows: 4,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'flat',
      label: 'Flat/Unit',
      placeholder: 'Enter Flat/Unit',
      fullWidth: true,
    },
    toShow: ['address'],
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'buildingName',
      label: 'Building Name',
      placeholder: 'Enter Building Name',
      fullWidth: true,
    },
    toShow: ['address'],
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'buildingNumber',
      label: 'Building Number',
      placeholder: 'Enter Building Number',
      fullWidth: true,
    },
    toShow: ['address'],
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'streetName',
      label: 'Street Name',
      placeholder: 'Enter Street Name',
      fullWidth: true,
    },
    toShow: ['address'],
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'city',
      label: 'Town/CIty',
      placeholder: 'Enter Town/City',
      fullWidth: true,
    },
    toShow: ['address'],
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'country',
      label: 'Country',
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
      heading: 'Other',
    },

    gridLength: 12,
    component: Typography,
  },

  {
    componentProps: {
      name: 'facebookUrl',
      label: 'Facebook URL',
      placeholder: 'Enter FaceBook URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    componentProps: {
      name: 'twitterUrl',
      label: 'Twitter URL',
      placeholder: 'Enter Twitter Url',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
];
