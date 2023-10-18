import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTimePicker,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const reAssignCallValidationSchema = Yup.object().shape({
  reschedule: Yup.string().trim().required('Field is Required'),
  date: Yup.string().trim().required('Field is Required'),
  time: Yup.string().trim().required('Field is Required'),
});

export const reAssignCallDefaultValues = {
  reschedule: '',
  date: '',
  time: '',
};

export const outcomesValidationSchema = Yup.object().shape({
  addoutcome: Yup.string().trim().required('Field is Required'),
  description: Yup.string().trim().required('Field is Required'),
});

export const outcomesDefaultValues = {
  addoutcome: '',
  description: '',
};

export const reAssignCallDataArray = [
  {
    componentProps: {
      name: 'reschedule',
      label: 'Reschedule',
      select: true,
    },
    options: [
      { value: 'To-do', label: 'To-do' },
      { value: 'Follow-up', label: 'Follow-up' },
      { value: 'Call reminder', label: 'Call reminder' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'date',
      label: 'Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'time',
      label: 'Time',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
];

export const outcomesDataArray = [
  {
    componentProps: {
      name: 'addoutcome',
      label: 'Add Outcome',
      select: true,
    },
    options: [
      { value: 'To-do', label: 'To-do' },
      { value: 'Follow-up', label: 'Follow-up' },
      { value: 'Call reminder', label: 'Call reminder' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
];
