import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTimePicker,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const reAssignCallValidationSchema = Yup?.object()?.shape({
  callFromDate: Yup?.string()?.trim()?.required('Field is Required'),
  callFromTime: Yup?.string()?.trim()?.required('Field is Required'),
  callToDate: Yup?.string()?.trim()?.required('Field is Required'),
  callToTime: Yup?.string()?.trim()?.required('Field is Required'),
});

export const reAssignCallDefaultValues = {
  callFromDate: '',
  callFromTime: '',
  callToDate: '',
  callToTime: '',
};

export const outcomesValidationSchema = Yup?.object()?.shape({
  outcome: Yup?.string()?.trim()?.required('Field is Required'),
  callNotes: Yup?.string()?.trim()?.required('Field is Required'),
});

export const outcomesDefaultValues = {
  outcome: '',
  callNotes: '',
};

export const reAssignCallDataArray = [
  {
    componentProps: {
      name: 'callFromDate',
      label: 'Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'callFromTime',
      label: 'Start Time',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'callToDate',
      label: '  End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'callToTime',
      label: 'End Time',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
];

export const outcomesDataArray = [
  {
    componentProps: {
      name: 'outcome',
      label: 'Add Outcome',
      select: true,
    },
    options: [
      { value: 'Interested', label: 'Interested' },
      { value: 'Left message', label: 'Left message' },
      { value: 'No response', label: 'No response' },
      { value: 'Not interested', label: 'Not interested' },
      { value: 'Not able to reach', label: 'Not able to reach' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'callNotes',
      label: 'Description',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
];
