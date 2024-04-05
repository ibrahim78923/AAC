import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  name: Yup.string().trim().required('Field is Required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Field is Required'),
  phoneNo: Yup.string().required('Field is Required'),
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
      placeholder: 'SC876543',
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
      placeholder: 'Organization name',
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
      placeholder: 'Johndoe@gmail.com',
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
      placeholder: '+4459654631',
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
      placeholder: 'Postal code',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'compositeAddress',
      label: 'Address',
      placeholder: 'Address',
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
