import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

const priority = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
  { value: 'Urgent', label: 'Urgent' },
];

const status = [
  { value: 'Open', label: 'Open' },
  { value: 'Close', label: 'Close' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Resolved', label: 'Resolved' },
];

export const validationSchema = Yup?.object()?.shape({
  description: Yup?.string(),
  plannedStartDate: Yup?.date(),
  plannedStartTime: Yup?.date(),
  plannedEndDate: Yup?.date(),
  plannedEndTime: Yup?.date(),
  plannedEffort: Yup?.mixed(),
  requester: Yup?.string(),
  priority: Yup?.string(),
  status: Yup?.string(),
});

export const defaultValues = {
  description: '',
  plannedStartDate: new Date(),
  plannedStartTime: new Date(),
  plannedEndDate: new Date(),
  plannedEndTime: new Date(),
  plannedEffort: [],
  requester: '',
  priority: '',
  status: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: RHFEditor,
  },
  {
    heading: 'PLAN',
    componentProps: {
      variant: 'h4',
    },
    component: Typography,
  },
  {
    componentProps: {
      name: 'plannedStartDate',
      label: 'Planned Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 7,
  },
  {
    componentProps: {
      name: 'plannedStartTime',
      label: '\u00a0\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 5,
  },
  {
    componentProps: {
      name: 'plannedEndDate',
      label: 'Planned End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 7,
  },
  {
    componentProps: {
      name: 'plannedEndTime',
      label: '\u00a0\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 5,
  },
  {
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      fullWidth: true,
      options: ['BE', 'BE1', 'BE2'],
      multiple: true,
    },
    component: RHFAutocomplete,
  },
  {
    heading: 'DETAILS',
    componentProps: {
      variant: 'h4',
    },
    component: Typography,
  },
  {
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
      options: ['BE', 'BE1', 'BE2'],
    },
    component: RHFAutocomplete,
  },
  {
    componentProps: {
      name: 'priority',
      label: 'Priority',
      fullWidth: true,
      select: true,
    },
    options: priority,
    component: RHFSelect,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
    },
    options: status,
    component: RHFSelect,
  },
];
