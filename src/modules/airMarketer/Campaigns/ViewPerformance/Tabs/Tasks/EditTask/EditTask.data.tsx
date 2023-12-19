import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup?.object().shape({
  taskName: Yup?.string()?.required('Field is Required'),
  taskType: Yup?.string()?.trim()?.required('Field is Required'),
  selectCompaign: Yup?.string()?.required('Field is Required'),
  assignedTo: Yup?.string()?.required('Field is Required'),
  dueDate: Yup?.string()?.required('Field is Required'),
  dueTime: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  taskName: '',
  taskType: '',
  selectCompaign: '',
  assignedTo: '',
  dueDate: null,
  dueTime: null,
};

export const dataArray = [
  {
    componentProps: {
      name: 'taskName',
      label: 'Task Name',
      fullWidth: true,
    },

    component: RHFTextField,

    md: 12,
  },
  {
    componentProps: {
      name: 'selectCompaign',
      label: 'selectCompaign',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'fabrizioRomano', label: 'fabrizioRomano' },
      { value: 'fabrizioRomano', label: 'fabrizioRomano' },
    ],

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'assignedTo',
      label: 'assignedTo',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'fabrizioRomano', label: 'fabrizioRomano' },
      { value: 'fabrizioRomano', label: 'fabrizioRomano' },
    ],

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'dueDate',
      label: 'Due Date',
      fullWidth: true,
    },

    component: RHFDatePicker,

    md: 12,
  },
  {
    componentProps: {
      name: 'dueTime',
      label: 'Due Time',
      fullWidth: true,
    },

    component: RHFDatePicker,

    md: 12,
  },

  {
    componentProps: {
      name: 'editor',
      label: 'Note',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
];
