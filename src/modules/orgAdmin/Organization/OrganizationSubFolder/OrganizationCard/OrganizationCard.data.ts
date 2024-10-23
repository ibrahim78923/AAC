import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

const phoneRegex = /^\+\d{1,3}[-.\s]?\d{10,}$/;

export const validationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Field is Required'),
  postCode: Yup?.string()?.trim()?.required('Field is Required'),
  email: Yup?.string()
    ?.email('Invalid email format')
    ?.required('Field is Required'),
  phoneNo: Yup?.string()
    ?.nullable()
    ?.test(
      'isValidPhoneNumber',
      'Phone number is not valid',
      (value) => !value || phoneRegex?.test(value),
    ),
});

export const defaultValues = {
  registrationNumber: '',
  name: '',
  email: '',
  phoneNo: '',
  postCode: '',
  compositeAddress: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'registrationNumber',
      label: 'Company Registration Number',
      fullWidth: true,
      select: false,
      placeholder: 'Enter crn',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'name',
      label: 'Organization Name',
      fullWidth: true,
      required: true,
      select: false,
      placeholder: 'Enter name',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'email',
      label: 'Email',
      fullWidth: true,
      select: false,
      required: true,
      placeholder: 'Enter email',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'phoneNo',
      label: 'Phone No',
      fullWidth: true,
      required: true,
      select: false,
      placeholder: 'Enter phone',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'postCode',
      label: 'Post Code',
      fullWidth: true,
      min: 0,
      placeholder: 'Enter post code',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'compositeAddress',
      label: 'Address',
      placeholder: 'Enter address',
      multiline: true,
      rows: 4,
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
  // commented for future use
  // {
  //   componentProps: {
  //     name: 'address',
  //     label: 'Address',
  //     fullWidth: true,
  //     select: false,
  //     required: true,
  //     placeholder: 'address',
  //   },
  //   component: RHFTextField,
  //   md: 12,
  // },
  // {
  //   componentProps: {
  //     name: 'unit',
  //     label: 'Flat/Unit',
  //     fullWidth: true,
  //     select: false,
  //     placeholder: 'Flat',
  //   },
  //   component: RHFTextField,
  //   md: 12,
  // },
  // {
  //   componentProps: {
  //     name: 'buildingName',
  //     label: 'Building Name',
  //     fullWidth: true,
  //     select: false,
  //     placeholder: 'Building name',
  //   },
  //   component: RHFTextField,
  //   md: 12,
  // },
  // {
  //   componentProps: {
  //     name: 'buildingNumber',
  //     label: 'Building Number',
  //     fullWidth: true,
  //     select: false,
  //     placeholder: 'Building number',
  //   },
  //   component: RHFTextField,

  //   md: 12,
  // },
  // {
  //   componentProps: {
  //     name: 'streetName',
  //     label: 'Street Name',
  //     fullWidth: true,
  //     select: false,
  //     placeholder: 'Street',
  //   },
  //   component: RHFTextField,
  //   md: 12,
  // },
  // {
  //   componentProps: {
  //     name: 'city',
  //     label: 'Town/City',
  //     fullWidth: true,
  //     select: false,
  //     placeholder: 'Town',
  //   },
  //   component: RHFTextField,

  //   md: 12,
  // },
  // {
  //   componentProps: {
  //     name: 'country',
  //     label: 'Country',
  //     fullWidth: true,
  //     select: true,
  //   },
  //   options: [{ value: 'United Kingdom', label: 'United Kingdom' }],
  //   component: RHFSelect,
  //   md: 12,
  // },
];
