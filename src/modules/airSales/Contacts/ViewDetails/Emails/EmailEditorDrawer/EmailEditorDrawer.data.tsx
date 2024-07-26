import {
  RHFDatePicker,
  RHFSelect,
  RHFTimePicker,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const emailValidationsSchema = Yup?.object()?.shape({});
export const emailDefaultValues = {};

export const options = [
  { value: 'Interested', label: 'Interested' },
  { value: 'Left message', label: 'Left message' },
  { value: 'No response', label: 'No response' },
  { value: 'No interested', label: 'No interested' },
  { value: 'No able to reach', label: 'No able to reach' },
  { value: 'Others', label: 'Others' },
];

export const scheduleEmailValidationSchema = Yup?.object()?.shape({});

export const scheduleEmailDefaultValues = {
  date: '',
  time: '',
  location: '',
};

export const scheduleEmailDataArray = [
  {
    componentProps: {
      name: 'date',
      label: '',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'time',
      label: '',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'location',
      label: '',
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

export const emailsData = [
  {
    from: 'shayan@ceative.co.uk',
    to: 'azeem@ceative.co.uk',
    sent: 'Wednesday, April 19,2023 - 11:14AM',
    subject: 'Test Mail',
  },
  {
    from: 'shayan@ceative.co.uk',
    to: 'azeem@ceative.co.uk',
    sent: 'Wednesday, April 19,2023 - 11:14AM',
    subject: 'Test Mail',
  },
];
