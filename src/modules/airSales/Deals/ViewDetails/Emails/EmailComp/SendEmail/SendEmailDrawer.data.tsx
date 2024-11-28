import { RHFDatePicker, RHFTimePicker } from '@/components/ReactHookForm';
import { CREATE_EMAIL_TYPES } from '@/constants';

import * as Yup from 'yup';

export const emailValidationsSchema: any = (drawerType: any) => {
  return Yup?.object()?.shape({
    ...(drawerType === CREATE_EMAIL_TYPES?.NEW_EMAIL && {
      subject: Yup?.string()?.trim()?.required('Field is Required'),
    }),
  });
};
export const emailDefaultValues = {};

export const options = [
  { value: 'Interested', label: 'Interested' },
  { value: 'Left message', label: 'Left message' },
  { value: 'No response', label: 'No response' },
];

export const scheduleEmailValidationSchema = Yup?.object()?.shape({
  date: Yup?.date()?.required('Field is Required'),
  time: Yup?.date()?.required('Field is Required'),
});

export const scheduleEmailDefaultValues = {
  date: null,
  time: null,
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
];

export const drawerTitle: any = {
  New: 'New Email',
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
    from: 'John Doe <johndoe@dummy.com>',
    sent: 'Wednesday April 19, 2023 - 11:30PM',
    to: 'John Doe <johndoe@dummy.com>',
    subject: 'Test mail',
  },
  {
    from: 'John Doe <johndoe@dummy.com>',
    sent: 'Wednesday April 19, 2023 - 11:30PM',
    to: 'John Doe <johndoe@dummy.com>',
    subject: 'Test mail',
  },
];
