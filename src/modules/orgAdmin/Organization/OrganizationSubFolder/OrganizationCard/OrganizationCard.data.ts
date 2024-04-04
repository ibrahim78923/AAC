import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  name: Yup.string().trim().required('Field is Required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Field is Required'),
  phoneNo: Yup.string().required('Field is Required'),
  postCode: Yup.string()
    .matches(/^[0-9]+$/, 'Post code must contain only digits')
    .required('Field is Required'),
  address: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  registrationNumber: '',
  name: '',
  email: '',
  phoneNo: '',
  postCode: '',
  address: '',
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
      required: true,
      min: 0,
      placeholder: 'Postal code',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'address',
      label: 'Address',
      fullWidth: true,
      select: false,
      required: true,
      placeholder: 'address',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'unit',
      label: 'Flat/Unit',
      fullWidth: true,
      select: false,
      placeholder: 'Flat',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'buildingName',
      label: 'Building Name',
      fullWidth: true,
      select: false,
      placeholder: 'Building name',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'buildingNumber',
      label: 'Building Number',
      fullWidth: true,
      select: false,
      placeholder: 'Building number',
    },
    component: RHFTextField,

    md: 12,
  },
  {
    componentProps: {
      name: 'streetName',
      label: 'Street Name',
      fullWidth: true,
      select: false,
      placeholder: 'Street',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'city',
      label: 'Town/City',
      fullWidth: true,
      select: false,
      placeholder: 'Town',
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
    options: [{ value: 'United Kingdom', label: 'United Kingdom' }],
    component: RHFSelect,
    md: 12,
  },
];
