import { RHFSelect } from '@/components/ReactHookForm';
import RHFTextField from '@/components/ReactHookForm/RHFTextField';
import * as Yup from 'yup';

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
  phoneNumber: Yup.string().matches(/^\+\d{1,}$/, 'Invalid phone number'),
  postCode: Yup.string()
    .required('Field is Required')
    .matches(/^[0-9]+$/, 'Must be a number'),
  compositeAddress: Yup.string()?.required('Field is Required'),
});

export const addUsersArray = [
  {
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      required: true,
      placeholder: 'Enter First Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'lastName',
      label: 'Last Name',
      required: true,
      placeholder: 'Enter Last  Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'postCode',
      label: 'Post Code',
      required: true,
      placeholder: 'Enter Post Code',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'compositeAddress',
      label: 'Address',
      required: true,
      placeholder: 'Address',
      fullWidth: true,
    },
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

        md: 12,
      },
    ],
  },
  {
    componentProps: {
      name: 'email',
      label: 'Email',
      required: true,
      placeholder: 'Enter Email',
      fullWidth: true,
    },
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
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'jobTitle',
      label: 'Job Title',
      placeholder: 'Enter Job Title',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'facebookUrl',
      label: 'Facebook URL',
      placeholder: 'Enter Facebook URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'linkedInUrl',
      label: 'LinkedIn URL',
      placeholder: 'Enter LinkedIn URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'twitterUrl',
      label: 'Twitter URL',
      placeholder: 'Enter Twitter URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
