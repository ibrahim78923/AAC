import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  accountName: Yup.string().required('Field is Required'),
  phoneNo: Yup.string().required('Field is Required'),
  postCode: Yup.string().required('Field is Required'),
  compositeAddress: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  accountName: '',
  phoneNo: '',
  postCode: '',
  products: [],
  compositeAddress: '',
};

export const dataArray = [
  {
    componentProps: {
      label: 'Company Name',
      placeholder: 'Enter Company Name',
      name: 'accountName',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      label: 'PhoneNo',
      placeholder: 'Enter Number',
      name: 'phoneNo',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      label: 'Post Code',
      placeholder: 'Enter Number',
      name: 'postCode',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      label: 'Address',
      placeholder: 'Enter Number',
      name: 'compositeAddress',
      fullWidth: true,
      required: true,
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
];
