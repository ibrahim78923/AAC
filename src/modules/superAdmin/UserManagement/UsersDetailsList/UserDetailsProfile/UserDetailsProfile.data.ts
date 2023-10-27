import { Typography } from '@mui/material';

import { RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const profileValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('Field is Required'),
  lastName: Yup.string().required('Field is Required'),
  postCode: Yup.string().required('Field is Required'),
  address: Yup.string().required('Field is Required'),
});

export const profileDefaultValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  phoneNo: '',
  email: '',
  jobTitlle: '',
  postCode: '',
  address: '',
  fbUrl: '',
  TwitterUrl: '',
};

export const profileFields = [
  {
    title: 'First Name',
    componentProps: {
      name: 'firstName',
      placeholder: 'Enter First Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    title: 'Middle Name',
    componentProps: {
      name: 'middleName',
      placeholder: 'Enter Middle Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    title: 'Last Name',
    componentProps: {
      name: 'lastName',
      placeholder: 'Enter Last Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    title: 'Phone Number',
    componentProps: {
      name: 'phoneNo',
      label: 'Enter Phone',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    title: 'Email',
    componentProps: {
      name: 'email',
      placeholder: 'Enter Email',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    title: 'Job Title',
    componentProps: {
      name: 'jobTitle',
      placeholder: 'Enter Job Title',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    title: 'Post Code',
    componentProps: {
      name: 'postCode',
      placeholder: 'Enter Post Code',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    title: 'Address',
    componentProps: {
      name: 'address',
      placeholder: 'Enter Address',
      fullWidth: true,
    },
    component: RHFTextField,
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
    title: 'Facebook URL',
    componentProps: {
      name: 'fbUrl',
      placeholder: 'Enter FaceBook URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    title: 'Twitter URL',
    componentProps: {
      name: 'twitterUrl',
      placeholder: 'Enter Twitter Url',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
];
