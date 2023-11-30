import {
  RHFDatePicker,
  RHFSearchableSelect,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const dealsCallsValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.trim()?.required('Field is Required'),
  fromDate: Yup?.string()?.trim()?.required('Field is Required'),
  toDate: Yup?.string()?.trim()?.required('Field is Required'),
  fromTime: Yup?.string()?.trim()?.required('Field is Required'),
  toTime: Yup?.string()?.trim()?.required('Field is Required'),
  linkDeal: Yup?.string()?.trim()?.required('Field is Required'),
  callType: Yup?.string()?.trim()?.required('Field is Required'),
  setReminder: Yup?.string()?.trim()?.required('Field is Required'),
  outcome: Yup?.string()?.trim()?.required('Field is Required'),
  callNotes: Yup?.string()?.trim()?.required('Field is Required'),
  outcomeText: Yup?.string()?.trim()?.required('Field is Required'),
});

export const dealsCallsDefaultValues = {
  title: '',
  fromDate: '',
  toDate: '',
  fromTime: '',
  toTime: '',
  linkDeal: '',
  callType: '',
  setReminder: '',
  outcome: '',
  callNotes: '',
  outcomeText: '',
};

export const dealsCallsDataArray = [
  {
    componentProps: {
      name: 'title',
      label: 'Title',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'fromDate',
      label: 'Form',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'toDate',
      label: 'To',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'fromTime',
      label: 'Form',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'toTime',
      label: 'To',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'linkDeal',
      label: 'Link Deal',
      isCheckBox: true,
      options: [
        { value: 'JohnDoe', label: 'John Doe' },
        { value: 'Andrew', label: 'Andrew' },
        { value: 'RichardRobertson', label: 'Richard robertson' },
        { value: 'Franksten', label: 'Franksten' },
      ],
    },
    component: RHFSearchableSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'callType',
      label: 'Select Call Type',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'Conference call', label: 'Conference call' },
      { value: 'One-on-One Call', label: 'One-on-One Call' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'setReminder',
      label: 'Set Reminder',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: '30 minutes before', label: '30 minutes before' },
      { value: '1 hour before', label: '1 hour before' },
      { value: '1 day before', label: '1 day before' },
      { value: '1 week before', label: '1 week before' },
    ],
    component: RHFSelect,
    md: 12,
  },
];

export const drawerTitle: any = {
  Add: 'Schedule Call',
  Edit: 'Edit Schedule Calls',
};
export const drawerButtonTitle: any = {
  Add: 'Save',
  Edit: 'Edit',
};

export const options = [
  { value: 'To-do', label: 'To-do' },
  { value: 'Follow-up', label: 'Follow-up' },
  { value: 'Call reminder', label: 'Call reminder' },
  { value: 'Call ', label: 'Call ' },
];
