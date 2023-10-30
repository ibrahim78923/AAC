import { Typography } from '@mui/material';

import { RHFMultiCheckbox, RHFSelect } from '@/components/ReactHookForm';

import RHFTextField from '@/components/ReactHookForm/RHFTextField';

import * as Yup from 'yup';

export const CompanyOwnerValidationSchema = Yup.object().shape({
  // userType: Yup.string().required('Field is Required'),
  firstName: Yup.string().required('Field is Required'),
  middleName: Yup.string().required('Field is Required'),
  lastName: Yup.string().required('Field is Required'),
  email: Yup.string().required('Field is Required'),
  crnNumber: Yup.string().required('Field is Required'),
  companyName: Yup.string().required('Field is Required'),
  phoneNo: Yup.string().required('Field is Required'),
});

export const superAdminValidationSchema = Yup.object().shape({
  // userType: Yup.string().required('Field is Required'),
  firstName: Yup.string().required('Field is Required'),
  middleName: Yup.string().required('Field is Required'),
  lastName: Yup.string().required('Field is Required'),
  email: Yup.string().required('Field is Required'),
  phoneNo: Yup.string().required('Field is Required'),
  postCode: Yup.string().required('Field is Required'),
  address: Yup.string().required('Field is Required'),
  jobTitle: Yup.string().required('Field is Required'),
  fbUrl: Yup.string().required('Field is Required'),
  linkinUrl: Yup.string().required('Field is Required'),
});

export const companyOwnerDefaultValues = {
  // userType: '',
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  crnNumber: '',
  companyName: '',
  phoneNo: '',
};
export const superAdminDefaultValues = {
  // userType: '',
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phoneNo: '',
  postCode: '',
  address: '',
  jobTitle: '',
  fbUrl: '',
  linkinUrl: '',
};

export const addUsersArray = [
  {
    title: 'First Name',
    componentProps: {
      name: 'firstName',
      placeholder: 'Enter First Name',
      fullWidth: true,
    },
    toShow: ['CompanyOwner', 'SuperAdmin'],
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Middle Name',
    componentProps: {
      name: 'middleName',
      placeholder: 'Enter Middle Name',
      fullWidth: true,
    },
    toShow: ['CompanyOwner', 'SuperAdmin'],
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
    toShow: ['CompanyOwner', 'SuperAdmin'],
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
    toShow: ['CompanyOwner', 'SuperAdmin'],
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Company Registration Number(CRN)',
    componentProps: {
      name: 'crnNumber',
      placeholder: 'Enter CRN Number',
      fullWidth: true,
    },
    toShow: ['CompanyOwner'],
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
    toShow: ['CompanyOwner'],
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
    toShow: ['CompanyOwner', 'SuperAdmin'],
    component: RHFTextField,
    md: 12,
  },

  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'h4',
      heading: 'Select Product(s)',
    },
    toShow: ['CompanyOwner'],
    gridLength: 12,
    component: Typography,
  },

  {
    componentProps: {
      name: 'products',
      options: ['Air Sales', 'Air Operation', 'Air Marketer', 'Air Service'],
      fullWidth: true,
    },
    toShow: ['CompanyOwner'],
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
    toShow: ['SuperAdmin'],
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Address',
    componentProps: {
      name: 'address',
      placeholder: 'Address',
      fullWidth: true,
    },
    toShow: ['SuperAdmin'],
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
        toShow: ['SuperAdmin'],
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
        toShow: ['SuperAdmin'],
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
        toShow: ['SuperAdmin'],
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
        toShow: ['SuperAdmin'],
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
        toShow: ['SuperAdmin'],
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
    toShow: ['SuperAdmin'],
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
    toShow: ['SuperAdmin'],
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
    toShow: ['SuperAdmin'],
    component: RHFTextField,
    md: 12,
  },
];

export const options = [
  { value: 'CompanyOwner', label: 'Company Owner' },
  { value: 'SuperAdmin', label: 'Super Admin' },
];
