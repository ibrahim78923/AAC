import { Typography } from '@mui/material';

import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

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
    // subData: [
    //   {
    //     title: 'Flat/Unit',
    //     componentProps: {
    //       name: 'flat',
    //       placeholder: 'Enter Flat/Unit',
    //       fullWidth: true,
    //     },
    //     toShow: ['SuperAdmin'],
    //     component: RHFTextField,
    //     md: 6,
    //   },
    //   {
    //     title: 'Building Name',
    //     componentProps: {
    //       name: 'buildingName',
    //       placeholder: 'Enter Building Name',
    //       fullWidth: true,
    //     },
    //     toShow: ['SuperAdmin'],
    //     component: RHFTextField,
    //     md: 6,
    //   },
    //   {
    //     title: 'Building Number',
    //     componentProps: {
    //       name: 'buildingNumber',
    //       placeholder: 'Enter Building Number',
    //       fullWidth: true,
    //     },
    //     toShow: ['SuperAdmin'],
    //     component: RHFTextField,
    //     md: 6,
    //   },
    //   {
    //     title: 'Street Name',
    //     componentProps: {
    //       name: 'streetName',
    //       placeholder: 'Enter Street Name',
    //       fullWidth: true,
    //     },
    //     toShow: ['SuperAdmin'],
    //     component: RHFTextField,
    //     md: 6,
    //   },
    //   {
    //     title: 'Town/CIty',
    //     componentProps: {
    //       name: 'city',
    //       placeholder: 'Enter Town/City',
    //       fullWidth: true,
    //     },
    //     toShow: ['SuperAdmin'],
    //     component: RHFTextField,
    //     md: 6,
    //   },
    //   {
    //     title: 'Country',
    //     componentProps: {
    //       name: 'country',
    //       fullWidth: true,
    //       select: true,
    //     },
    //     options: [
    //       { value: 'pakistan', label: 'Pakistan' },
    //       { value: 'India', label: 'India' },
    //       { value: 'uk', label: 'UK' },
    //       { value: 'us', label: 'US' }

    //     ],
    //     component: RHFSelect,
    //     md: 6,
    //   },
    // ]
  },
  {
    title: 'Flat/Unit',
    componentProps: {
      name: 'flat',
      placeholder: 'Enter Flat/Unit',
      fullWidth: true,
    },
    toShow: ['address'],
    component: RHFTextField,
    md: 6,
  },
  {
    title: 'Building Name',
    componentProps: {
      name: 'buildingName',
      placeholder: 'Enter Building Name',
      fullWidth: true,
    },
    toShow: ['address'],
    component: RHFTextField,
    md: 6,
  },
  {
    title: 'Building Number',
    componentProps: {
      name: 'buildingNumber',
      placeholder: 'Enter Building Number',
      fullWidth: true,
    },
    toShow: ['address'],
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
    toShow: ['address'],
    component: RHFTextField,
    md: 6,
  },
  {
    title: 'Town/CIty',
    componentProps: {
      name: 'city',
      placeholder: 'Enter Town/City',
      fullWidth: true,
    },
    toShow: ['address'],
    component: RHFTextField,
    md: 6,
  },
  {
    title: 'Country',
    componentProps: {
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
