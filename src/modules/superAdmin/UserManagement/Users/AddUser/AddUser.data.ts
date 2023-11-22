import { Typography } from '@mui/material';

import { RHFMultiCheckbox, RHFSelect } from '@/components/ReactHookForm';

import RHFTextField from '@/components/ReactHookForm/RHFTextField';

import * as Yup from 'yup';

export const CompanyOwnerValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('Field is Required'),
  lastName: Yup.string().required('Field is Required'),
  email: Yup.string().required('Field is Required'),
  crn: Yup.string().required('Field is Required'),
  companyName: Yup.string().required('Field is Required'),
  phoneNumber: Yup.string().required('Field is Required'),
});

export const superAdminValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('Field is Required'),
  lastName: Yup.string().required('Field is Required'),
  email: Yup.string().required('Field is Required'),
  phoneNumber: Yup.string().required('Field is Required'),
  postCode: Yup.string().required('Field is Required'),
  address: Yup.string().required('Field is Required'),
  jobTitle: Yup.string().required('Field is Required'),
  fbUrl: Yup.string().required('Field is Required'),
  linkinUrl: Yup.string().required('Field is Required'),
});

export const addUsersArray = [
  {
    title: 'First Name',
    componentProps: {
      name: 'firstName',
      placeholder: 'Enter First Name',
      fullWidth: true,
    },
    toShow: ['COMPANY_OWNER', 'SUPER_ADMIN'],
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Last Name',
    componentProps: {
      name: 'lastName',
      placeholder: 'Enter Last  Name',
      fullWidth: true,
    },
    toShow: ['COMPANY_OWNER', 'SUPER_ADMIN'],
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Email',
    componentProps: {
      name: 'email',
      placeholder: 'Enter Email',
      fullWidth: true,
    },
    toShow: ['COMPANY_OWNER', 'SUPER_ADMIN'],
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Company Registration Number(CRN)',
    componentProps: {
      name: 'crn',
      placeholder: 'Enter CRN Number',
      fullWidth: true,
    },
    toShow: ['COMPANY_OWNER'],
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Company Name',
    componentProps: {
      name: 'companyName',
      placeholder: 'Enter Company  Name',
      fullWidth: true,
    },
    toShow: ['COMPANY_OWNER'],
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Phone Number',
    componentProps: {
      name: 'phoneNumber',
      placeholder: 'Enter Number',
      fullWidth: true,
    },
    toShow: ['COMPANY_OWNER', 'SUPER_ADMIN'],
    component: RHFTextField,
    md: 12,
  },

  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'h4',
      heading: 'Select Product(s)',
    },
    toShow: ['COMPANY_OWNER'],
    gridLength: 12,
    component: Typography,
  },

  {
    componentProps: {
      name: 'products',
      label: 'Products',
      GridView: 6,
      isCheckBox: true,
      options: [
        { value: '1', label: '1' },
        { value: '1', label: '1' },
        { value: '1', label: '1' },
        { value: '1', label: '1' },
        { value: '1', label: '1' },
      ],
      fullWidth: true,
    },
    toShow: ['COMPANY_OWNER'],
    component: RHFMultiCheckbox,
    md: 12,
  },

  {
    title: 'Post Code',
    componentProps: {
      name: 'postCode',
      placeholder: 'Enter Post Code',
      fullWidth: true,
    },
    toShow: ['SUPER_ADMIN'],
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'address',
      placeholder: 'Address',
      label: 'Address',
      fullWidth: true,
    },
    toShow: ['SUPER_ADMIN'],
    component: RHFTextField,
    md: 12,
    subData: [
      {
        title: 'Flat/Unit',
        componentProps: {
          name: 'flat',
          placeholder: 'Enter Flat/Unit',
          fullWidth: true,
        },
        toShow: ['SUPER_ADMIN'],
        component: RHFTextField,
        md: 12,
      },
      {
        title: 'Building Name',
        componentProps: {
          name: 'buildingName',
          placeholder: 'Enter Building Name',
          fullWidth: true,
        },
        toShow: ['SUPER_ADMIN'],
        component: RHFTextField,
        md: 12,
      },
      {
        title: 'Building Number',
        componentProps: {
          name: 'buildingNumber',
          placeholder: 'Enter Building Number',
          fullWidth: true,
        },
        toShow: ['SUPER_ADMIN'],
        component: RHFTextField,
        md: 12,
      },
      {
        title: 'Street Name',
        componentProps: {
          name: 'streetName',
          placeholder: 'Enter Street Name',
          fullWidth: true,
        },
        toShow: ['SUPER_ADMIN'],
        component: RHFTextField,
        md: 12,
      },
      {
        title: 'Town/CIty',
        componentProps: {
          name: 'city',
          placeholder: 'Enter Town/City',
          fullWidth: true,
        },
        toShow: ['SUPER_ADMIN'],
        component: RHFTextField,
        md: 12,
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
        md: 12,
      },
    ],
  },
  {
    title: 'Job Title',
    componentProps: {
      name: 'jobTitle',
      placeholder: 'Enter Job Title',
      fullWidth: true,
    },
    toShow: ['SUPER_ADMIN'],
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Facebook URL',
    componentProps: {
      name: 'fbUrl',
      placeholder: 'Enter Facebook URL',
      fullWidth: true,
    },
    toShow: ['SUPER_ADMIN'],
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'LinkedIn URL',
    componentProps: {
      name: 'linkinUrl',
      placeholder: 'Enter LinkedIn URL',
      fullWidth: true,
    },
    toShow: ['SUPER_ADMIN'],
    component: RHFTextField,
    md: 12,
  },
];
