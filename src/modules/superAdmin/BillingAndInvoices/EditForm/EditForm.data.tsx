import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  requester: Yup.string().required('Field is Required'),

  subject: Yup.string().trim().required('Field is Required'),

  description: Yup.string(),

  category: Yup.string(),

  status: Yup.string().required('Field is Required'),

  priority: Yup.string().required('Field is Required'),

  department: Yup.string(),

  source: Yup.string(),

  impact: Yup.string(),

  agent: Yup.string(),

  plannedStartDate: Yup.date(),

  plannedStartTime: Yup.date(),

  plannedEndDate: Yup.date(),

  plannedEndTime: Yup.date(),

  plannedEffort: Yup.string(),

  attachFile: Yup.mixed(),
});

export const defaultValues = {
  requester: '', //1

  subject: '', //2

  description: '', //3

  category: '', //4

  status: '', //5

  priority: '', //6

  department: '', //7

  source: '', //8

  impact: '', //9

  agent: '', //10

  plannedStartDate: new Date(), //11

  plannedStartTime: new Date(), //12

  plannedEndDate: new Date(), //13

  plannedEndTime: new Date(), //14

  plannedEffort: '', //15

  attachFile: null, //16
};

export const dataArray = [
  {
    componentProps: {
      name: 'requester',

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
      name: 'product/suite',

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
      name: 'plannedStartDate',

      label: 'Planned Start Date',

      fullWidth: true,
    },

    component: RHFDatePicker,

    md: 12,
  },
];
