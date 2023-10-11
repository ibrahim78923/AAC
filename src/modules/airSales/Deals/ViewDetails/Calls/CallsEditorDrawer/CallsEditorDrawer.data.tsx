import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const dealsCallsValidationSchema = Yup.object().shape({
  title: Yup.string().trim().required('Field is Required'),
  description: Yup.string().trim().required('Field is Required'),
  attachfile: Yup.string().trim().required('Field is Required'),
});

export const dealsCallsDefaultValues = {
  title: '',
  description: '',
  attachfile: '',
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
      name: 'startdate',
      label: 'Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'starttime',
      label: 'Start Time',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'enddate',
      label: '  End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'endtime',
      label: 'End Time',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'owner',
      label: 'Owner',
      select: true,
    },
    options: [
      { value: 'Guy Hawkins', label: 'Guy Hawkins' },
      { value: 'Jacob Jones', label: 'Jacob Jones' },
      { value: 'Courtney Henry', label: 'Courtney Henry' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'attendees',
      label: 'Attendees',
      select: true,
    },
    options: [
      { value: 'Guy Hawkins', label: 'Guy Hawkins' },
      { value: 'Jacob Jones', label: 'Jacob Jones' },
      { value: 'Courtney Henry', label: 'Courtney Henry' },
    ],
    component: RHFSelect,
    md: 8,
  },
  {
    componentProps: {
      name: 'outcome',
      label: 'Outcome',
      select: true,
    },
    options: [
      { value: 'Interested', label: 'Interested' },
      { value: 'Left Message', label: 'Left Message' },
      { value: 'No Response', label: 'No Response' },
    ],
    component: RHFSelect,
    md: 12,
  },

  {
    componentProps: {
      name: 'attachfile',
      label: '',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
];

export const drawerTitle: any = {
  Add: 'Add Notes',
  Edit: 'Edit Notes',
  View: 'View Notes',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
