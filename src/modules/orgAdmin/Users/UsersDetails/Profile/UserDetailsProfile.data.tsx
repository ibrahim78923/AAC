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
      placeholder: 'Enter Number',
      name: 'phoneNo',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    title: 'Email',
    componentProps: {
      placeholder: 'Enter Email',
      name: 'email',
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
    title: 'Flat/Unit',
    componentProps: {
      name: 'flatUnit',
      placeholder: 'Enter Flat/Unit',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    title: 'BuildingName',
    componentProps: {
      name: 'buildingName',
      placeholder: 'Enter Building Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    title: 'Building Number',
    componentProps: {
      name: 'buildingNum',
      placeholder: 'Enter Building Number',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    title: 'Street Name',
    componentProps: {
      name: 'streetName',
      placeholder: 'Enter Street Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    title: 'Town/City',
    componentProps: {
      name: 'townCity',
      placeholder: 'Enter Town/City',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    title: 'Country',
    componentProps: {
      name: 'country',
      placeholder: 'Enter Country',
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
      placeholder: 'Enter Facebook URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    title: 'Twitter URL',
    componentProps: {
      name: 'twitterUrl',
      placeholder: 'Twitter URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
];
