import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

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
  clientName: '',
  product: '',
  planType: '',
  additionalUser: '',
  planPrice: '',
  defaultUser: '',
  additionalStorage: '',
  discount: '',
  billingCycle: '',
  agent: '',
  date: new Date(),
};

export const dataArray = [
  {
    componentProps: {
      name: 'clientName',
      label: 'Client Name & Organization',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'andrew', label: 'Andrew Stuart,Acceron' },
      { value: 'John', label: 'John Doe,Orcalo' },
      { value: 'Olivia', label: 'Mall of wah' },
      { value: 'John', label: 'John ,Signup' },
    ],

    component: RHFSelect,

    md: 12,
  },

  {
    componentProps: {
      name: 'product',
      label: 'Product/Suite',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'airSales', label: 'Air Sales' },
      { value: 'airMarketer', label: 'Air Marketer' },
      { value: 'airOperations', label: 'Air Operations' },
      { value: 'airServices', label: 'Air Services' },
      { value: 'loyaltyProgram', label: 'Loyalty Program' },
    ],

    component: RHFSelect,

    md: 12,
  },

  {
    componentProps: {
      name: 'planType',
      label: 'Plan Type',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'Growth', label: 'Growth' },
      { value: 'Enterprise', label: 'Enterprise' },
      { value: 'Premiun', label: 'Premiun' },
    ],

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'additionalUser',
      label: 'Additional User',
      fullWidth: true,
    },

    component: RHFTextField,

    md: 12,
  },
  {
    componentProps: {
      name: 'planPrice',
      label: 'Plan Price',
      fullWidth: true,
    },

    component: RHFTextField,

    md: 4,
  },
  {
    componentProps: {
      name: 'defaultUser',
      label: 'Default User',
      fullWidth: true,
    },

    component: RHFTextField,

    md: 4,
  },
  {
    componentProps: {
      name: 'defaultUser',
      label: 'Default User',
      fullWidth: true,
    },

    component: RHFTextField,

    md: 4,
  },
  {
    componentProps: {
      name: 'additionalStorage',
      label: 'Additional Storage',
      fullWidth: true,
    },

    component: RHFTextField,

    md: 12,
  },
  {
    componentProps: {
      name: 'discount',
      label: 'Discount(%)',
      fullWidth: true,
    },

    component: RHFTextField,

    md: 12,
  },
  {
    componentProps: {
      name: 'billingCycle',
      label: 'Billing Cycle',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'paidMonthly', label: 'Paid Monthly' },
      { value: 'paidquarterly', label: 'Paid Quarterly' },
      { value: 'paidHalfYearly', label: 'Paid Half-Yearly' },
      { value: 'paidAnnually', label: 'Paid Annually' },
    ],

    component: RHFSelect,

    md: 12,
  },

  {
    componentProps: {
      name: 'date',
      label: 'Planned Start Date',
      fullWidth: true,
    },

    component: RHFDatePicker,

    md: 12,
  },
];
