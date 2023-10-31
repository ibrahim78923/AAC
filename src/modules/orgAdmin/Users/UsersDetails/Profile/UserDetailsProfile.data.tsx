import { RHFTextField } from '@/components/ReactHookForm';

import { Typography } from '@mui/material';

import * as Yup from 'yup';

export const profileValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('Field is Required'),
  lastName: Yup.string().required('Field is Required'),
  postCode: Yup.string().required('Field is Required'),
  address: Yup.string().required('Field is Required'),
  flatUnit: Yup.string().required('Field is Required'),
  buildingName: Yup.string().required('Field is Required'),
  buildingNum: Yup.string().required('Field is Required'),
  streetName: Yup.string().required('Field is Required'),
  townCity: Yup.string().required('Field is Required'),
  country: Yup.string().required('Field is Required'),
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
  flatUnit: '',
  buildingName: '',
  buildingNum: '',
  streetName: '',
  townCity: '',
  country: '',
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
      name: 'flatUnit',
      label: 'Flat/Unit',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'buildingName',
      label: 'BuildingName',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'buildingNum',
      label: 'Building Number',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'streetName',
      label: 'Street Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    componentProps: {
      name: 'townCity',
      label: 'Town/City',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    componentProps: {
      name: 'country',
      label: 'Country',
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
    componentProps: {
      name: 'fbUrl',
      label: 'Facebook URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    componentProps: {
      name: 'twitterUrl',
      label: 'Twitter URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
];
