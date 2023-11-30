import { Typography } from '@mui/material';

import { RHFMultiCheckbox, RHFSelect } from '@/components/ReactHookForm';

import RHFTextField from '@/components/ReactHookForm/RHFTextField';

import * as Yup from 'yup';
import useUserManagement from '../../useUserManagement';

export const CompanyOwnerValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Field is Required')
    .matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed'),
  lastName: Yup.string()
    .required('Field is Required')
    .matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed'),
  email: Yup.string()
    .required('Field is Required')
    .email('Invalid email address'),
  crn: Yup.string()
    .required('Field is Required')
    .matches(/^[0-9]+$/, 'Must be a number'),
  phoneNumber: Yup.string()
    .matches(/^\+\d{1,}$/, 'Invalid phone number')
    .required('Phone number is required'),
});

export const superAdminValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Field is Required')
    .matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed'),
  lastName: Yup.string()
    .required('Field is Required')
    .matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed'),
  email: Yup.string()
    .required('Field is Required')
    .email('Invalid email address'),
  phoneNumber: Yup.string()
    .matches(/^\+\d{1,}$/, 'Invalid phone number')
    .required('Phone number is required'),
  postCode: Yup.string()
    .required('Field is Required')
    .matches(/^[0-9]+$/, 'Must be a number'),
  compositeAddress: Yup.string(),
  jobTitle: Yup.string()
    .required('Field is Required')
    .matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed'),
  fbUrl: Yup.string()
    .required('Field is Required')
    .matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed'),
  linkinUrl: Yup.string()
    .required('Field is Required')
    .matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed'),
});

export const companyOwnerDefaultValues = {
  products: [],
};

export const addUsersArray = () => {
  const { products: productsList } = useUserManagement();
  return [
    {
      componentProps: {
        name: 'firstName',
        label: 'First Name',
        placeholder: 'Enter First Name',
        fullWidth: true,
      },
      toShow: ['COMPANY_OWNER', 'SUPER_ADMIN'],
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Enter Last  Name',
        fullWidth: true,
      },
      toShow: ['COMPANY_OWNER', 'SUPER_ADMIN'],
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter Email',
        fullWidth: true,
      },
      toShow: ['COMPANY_OWNER', 'SUPER_ADMIN'],
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'phoneNumber',
        label: 'Phone Number',
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
        GridView: 6,
        isCheckBox: true,
        options: productsList?.data?.map((item: any) => ({
          value: item?._id,
          label: item?.name,
        })),
        fullWidth: true,
      },
      toShow: ['COMPANY_OWNER'],
      component: RHFMultiCheckbox,
      md: 12,
    },

    {
      componentProps: {
        name: 'postCode',
        label: 'Post Code',
        placeholder: 'Enter Post Code',
        fullWidth: true,
      },
      toShow: ['SUPER_ADMIN'],
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'compositeAddress',
        label: 'Address',
        placeholder: 'Address',
        fullWidth: true,
      },
      toShow: ['SUPER_ADMIN'],
      component: RHFTextField,
      md: 12,
      subData: [
        {
          componentProps: {
            name: 'flat',
            label: 'Flat/Unit',
            placeholder: 'Enter Flat/Unit',
            fullWidth: true,
          },
          toShow: ['SUPER_ADMIN'],
          component: RHFTextField,
          md: 12,
        },
        {
          componentProps: {
            name: 'buildingName',
            label: 'Building Name',
            placeholder: 'Enter Building Name',
            fullWidth: true,
          },
          toShow: ['SUPER_ADMIN'],
          component: RHFTextField,
          md: 12,
        },
        {
          componentProps: {
            name: 'buildingNumber',
            label: 'Building Number',
            placeholder: 'Enter Building Number',
            fullWidth: true,
          },
          toShow: ['SUPER_ADMIN'],
          component: RHFTextField,
          md: 12,
        },
        {
          componentProps: {
            name: 'streetName',
            label: 'Street Name',
            placeholder: 'Enter Street Name',
            fullWidth: true,
          },
          toShow: ['SUPER_ADMIN'],
          component: RHFTextField,
          md: 12,
        },
        {
          componentProps: {
            name: 'city',
            label: 'Town/CIty',
            placeholder: 'Enter Town/City',
            fullWidth: true,
          },
          toShow: ['SUPER_ADMIN'],
          component: RHFTextField,
          md: 12,
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
          toShow: ['SUPER_ADMIN'],
          md: 12,
        },
      ],
    },
    {
      componentProps: {
        name: 'jobTitle',
        label: 'Job Title',
        placeholder: 'Enter Job Title',
        fullWidth: true,
      },
      toShow: ['SUPER_ADMIN'],
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'fbUrl',
        label: 'Facebook URL',
        placeholder: 'Enter Facebook URL',
        fullWidth: true,
      },
      toShow: ['SUPER_ADMIN'],
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'linkinUrl',
        label: 'LinkedIn URL',
        placeholder: 'Enter LinkedIn URL',
        fullWidth: true,
      },
      toShow: ['SUPER_ADMIN'],
      component: RHFTextField,
      md: 12,
    },
  ];
};
