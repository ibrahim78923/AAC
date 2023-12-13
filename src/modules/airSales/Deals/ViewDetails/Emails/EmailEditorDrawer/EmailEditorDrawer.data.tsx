import {
  RHFDatePicker,
  RHFSelect,
  RHFTimePicker,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const emailValidationsSchema = Yup?.object()?.shape({});
export const emailDefaultValues = {};

export const options = [
  { value: 'To-do', label: 'To-do' },
  { value: 'Follow-up', label: 'Follow-up' },
  { value: 'Call reminder', label: 'Call reminder' },
  { value: 'Call ', label: 'Call ' },
];

export const scheduleEmailValidationSchema = Yup?.object()?.shape({});

export const scheduleEmailDefaultValues = {
  date: null,
  time: null,
  location: '',
};

export const scheduleEmailDataArray = [
  {
    componentProps: {
      name: 'date',
      label: 'Date Picker',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'time',
      label: 'Time Picker',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'location',
      label: 'Location',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'To-do', label: 'To-do' },
      { value: 'Follow-up', label: 'Follow-up' },
      { value: 'Call reminder', label: 'Call reminder' },
      { value: 'Call ', label: 'Call ' },
    ],
    component: RHFSelect,
    md: 12,
  },
];

export const drawerTitle: any = {
  New: 'New Emails',
  Forward: 'Forward',
  Reply: 'Reply',
};
export const drawerButtonTitle: any = {
  New: 'Save',
  Forward: 'Send',
  Reply: 'Send',
};
