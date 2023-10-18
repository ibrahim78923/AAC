import { RHFSearchableSelect, RHFSelect } from '@/components/ReactHookForm';

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
  status: '',
  product: '',
  userName: '',
  company: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'user',
      label: 'UserName',
    },

    options: [
      { value: 'JohnDoe', label: 'John Doe' },
      { value: 'Andrew', label: 'Andrew' },
      { value: 'RichardRobertson', label: 'Richard robertson' },
      { value: 'Franksten', label: 'Franksten' },
    ],
    component: RHFSearchableSelect,
    md: 12,
  },

  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'active', label: 'Active' },
      { value: 'inActive', label: 'In Active' },
    ],

    component: RHFSelect,

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
