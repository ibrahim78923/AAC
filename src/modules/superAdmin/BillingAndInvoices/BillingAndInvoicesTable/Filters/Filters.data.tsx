import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';

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

      label: 'Client & Organization',

      fullWidth: true,

      select: true,
    },

    options: [
      { value: 'AnglicLtd', label: 'Anglic Ltd' },
      { value: 'Orcalo', label: 'Orcalo' },
      { value: '10Pearls', label: '10 Pearls' },
      { value: 'ExtremeCommerce', label: 'Extreme Commerce' },
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
      name: 'plannedStartDate',

      label: 'Planned Start Date',

      fullWidth: true,
    },

    component: RHFDatePicker,

    md: 12,
  },
];
