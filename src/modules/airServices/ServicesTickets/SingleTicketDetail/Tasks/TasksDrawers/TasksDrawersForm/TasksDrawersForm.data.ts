import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const TaskTicketFormValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required('Field is Required'),
  description: Yup?.string(),
  department: Yup?.string()?.required('Field is Required'),
  assignTo: Yup?.string(),
  status: Yup?.string(),
  notifyBefore: Yup?.string(),
  plannedStartDate: Yup?.date(),
  plannedStartTime: Yup?.date(),
  plannedEndDate: Yup?.date(),
  plannedEndTime: Yup?.date(),
  plannedEffort: Yup?.string(),
});

export const TaskTicketFormDefaultValues = {
  title: '', //1
  description: '', //2
  department: '', //3
  assignTo: '', //4
  status: '', //5
  notifyBefore: '', //6
  plannedStartDate: new Date(), //7
  plannedStartTime: new Date(), //8
  plannedEndDate: new Date(), //9
  plannedEndTime: new Date(), //10
  plannedEffort: '', //11
};

export const TaskTicketFormFields = [
  {
    componentProps: {
      name: 'title',
      label: 'Title',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
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
  {
    componentProps: {
      name: 'department',
      label: 'Department',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'IT', label: 'IT' },
      { value: 'HR', label: 'HR' },
      { value: 'Finance', label: 'Finance' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'assignTo',
      label: 'Assign To',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'Cameron Williamson', label: 'Cameron Williamson' },
      { value: 'Cameron Williamson', label: 'Cameron Williamson' },
      { value: 'Cameron Williamson', label: 'Cameron Williamson' },
      { value: 'Cameron Williamson', label: 'Cameron Williamson' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'notifyBefore',
      label: 'Notify Before',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: '5 Minutes', label: '5 Minutes' },
      { value: '10 Minutes', label: '10 Minutes' },
      { value: '15 Minutes', label: '15 Minutes' },
      { value: '30 Minutes', label: '30 Minutes' },
      { value: 'Never', label: 'Never' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'plannedStartDate',
      label: 'Planned Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 8,
  },
  {
    componentProps: {
      name: 'plannedStartTime',
      label: '\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 4,
  },
  {
    componentProps: {
      name: 'plannedEndDate',
      label: 'Planned End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 8,
  },
  {
    componentProps: {
      name: 'plannedEndTime',
      label: '\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 4,
  },
  {
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
