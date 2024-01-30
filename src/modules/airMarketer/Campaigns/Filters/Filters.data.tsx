import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  campaignOwner: Yup?.string()?.required('Field is Required'),
  campaignStatus: Yup?.string()?.trim()?.required('Field is Required'),
  startDate: Yup?.string()?.trim()?.required('Field is Required'),

  endDate: Yup?.string()?.trim()?.required('Field is Required'),
});

export const defaultValues = {
  campaignOwner: '',
  campaignStatus: '',
  startDate: null,
  endDate: null,
};

export const dataArray = [
  {
    componentProps: {
      name: 'campaignStatus',
      label: 'Campaign Status',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'scheduled', label: 'Scheduled' },
      { value: 'inprogress', label: 'In Progress' },
      { value: 'active', label: 'Active' },
      { value: 'paused', label: 'Paused' },
      { value: 'completed', label: 'Completed' },
    ],

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'campaignOwner',
      label: 'Campaign Owner',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'scheduled', label: 'Scheduled' },
      { value: 'inprogress', label: 'In Progress' },
      { value: 'active', label: 'Active' },
      { value: 'paused', label: 'Paused' },
      { value: 'completed', label: 'Completed' },
    ],

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
    },

    component: RHFDatePicker,

    md: 12,
  },
  {
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
    },

    component: RHFDatePicker,

    md: 12,
  },
];
