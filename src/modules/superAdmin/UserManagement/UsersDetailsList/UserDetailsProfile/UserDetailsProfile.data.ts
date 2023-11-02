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
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    componentProps: {
      name: 'middleName',
      label: 'Middle Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'lastName',
      label: 'Last Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'phoneNo',
      label: 'Phone Number',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'email',
      label: 'Email',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'jobTitle',
      label: 'Job Title',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    componentProps: {
      name: 'postCode',
      label: 'Post Code',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    componentProps: {
      name: 'address',
      label: 'Address',
      fullWidth: true,
    },
    component: RHFTextField,
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
      name: 'fbUrl',
      label: 'FaceBook URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    componentProps: {
      name: 'twitterUrl',
      label: 'Twitter Url',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
];
