import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  clientName: Yup.string().trim().required('Field is Required'),
  product: Yup.string().trim().required('Field is Required'),
  planType: Yup.string().trim().required('Field is Required'),
  additionalUser: Yup.string().trim().required('Field is Required'),
  planPrice: Yup.string().trim().required('Field is Required'),
  defaultUser: Yup.string().trim().required('Field is Required'),
  additionalStorage: Yup.string().trim().required('Field is Required'),
  discount: Yup.string().trim().required('Field is Required'),
  billingCycle: Yup.string().trim().required('Field is Required'),
  date: Yup.date(),
});

export const defaultValues = {
  companyName: '',
  phoneNo: '',
  userName: '',
  company: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'companyName',
      label: 'Company Name',
      fullWidth: true,
    },

    component: RHFTextField,

    md: 12,
  },
  {
    componentProps: {
      name: 'phoneNo',
      label: 'Phone No',
      fullWidth: true,
    },

    component: RHFTextField,

    md: 12,
  },

  {
    componentProps: {
      name: 'producct',
      label: 'Product',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'serviceCart', label: 'Service Cart' },
      { value: 'marketingCart', label: 'Marketing Cart' },
    ],

    component: RHFSelect,

    md: 12,
  },

  {
    componentProps: {
      name: 'company',
      label: 'Company',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'orcaloHoldings', label: 'Orcalo Holdings' },
      { value: 'airAppleCart', label: 'Air applecart' },
    ],

    component: RHFSelect,

    md: 12,
  },
];
