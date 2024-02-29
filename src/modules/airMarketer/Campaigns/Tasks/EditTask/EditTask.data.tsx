import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography, useTheme } from '@mui/material';

import * as Yup from 'yup';

export const validationSchema = Yup?.object().shape({
  taskName: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  taskName: '',
  taskType: '',
  selectCompaign: '',
  assignedTo: '',
  dueDate: null,
  dueTime: null,
};

export const dataArray = () => {
  const theme = useTheme();
  return [
    {
      componentProps: {
        name: 'taskName',
        label: 'Task Name',
        placeholder: 'Enter Name',
        required: true,
        fullWidth: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'taskType',
        label: 'Task Type',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'email', label: 'Email' },
        { value: 'other', label: 'Other' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'selectCompaign',
        label: 'Select Campaign',
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
        label: 'Assigned To',
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
        color: theme?.palette?.grey[500],
        variant: 'body2',
        heading: 'You can customize your default settings. Go to Settings',
      },
      gridLength: 12,
      component: Typography,
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
};
