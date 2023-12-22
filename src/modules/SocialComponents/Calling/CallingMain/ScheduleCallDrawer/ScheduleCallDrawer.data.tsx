import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const dealsCallsValidationSchema = Yup.object().shape({
  title: Yup.string().trim().required('Field is Required'),
  callFromDate: Yup.string().required('Field is Required'),
  callFromTime: Yup.string().required('Field is Required'),
  callToTime: Yup.string().required('Field is Required'),
  callToDate: Yup.string().required('Field is Required'),
});

export const dealsCallsDefaultValues = {
  title: '',
  owner: '',
  outcome: '',
  callType: '',
};

export const dealsCallsDataArray = (DealsListData: any) => [
  {
    componentProps: {
      name: 'title',
      label: 'Title',
      required: true,
      placeholder: 'Title',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'callFromDate',
      label: 'Start Date',
      required: true,
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'callToDate',
      label: '  End Date',
      fullWidth: true,
      required: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'callFromTime',
      label: 'Start Time',
      fullWidth: true,
      required: true,
    },
    component: RHFTimePicker,
    md: 6,
  },

  {
    componentProps: {
      name: 'callToTime',
      label: 'End Time',
      required: true,
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },

  {
    componentProps: {
      name: 'dealId',
      label: 'Link Deal',
      fullWidth: true,
      select: true,
    },

    options: DealsListData,

    component: RHFSelect,

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
  Edit: 'Edit Call',
  View: 'View Call',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
