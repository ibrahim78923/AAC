import { RHFDropZone, RHFTextField } from '@/components/ReactHookForm';

import { Typography } from '@mui/material';

import * as Yup from 'yup';

export const customValidationSchema = Yup?.object()?.shape({
  file: Yup?.string()?.required('Field is Required'),
  contacts: Yup?.string()?.required('Field is Required'),
  date: Yup?.string()?.required('Field is Required'),
});

export const customDefaultValues = {
  file: '',
  contacts: '',
  date: '',
};

export const importContactsData = [
  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'h4',
      heading: 'Upload a file',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    // heading: 'Upload a file',
    componentProps: {
      name: 'file',
      label: 'Select',
      select: false,
    },
    md: 4,
    component: RHFDropZone,
  },
  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'h4',
      heading: 'Choose how to import Contact',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    // heading: 'Choose how to import Contact',
    componentProps: {
      name: 'contacts',
      label: 'Select',
      select: true,
    },
    options: [
      { head: 'head' },
      { label: 'Mandatory Fileds', value: 'Mandatory Fields' },
      { label: 'Date', value: 'Date' },
      { label: 'Amount', value: 'Amount' },
      { label: 'optional Fields', value: 'optional Fields' },
      { label: 'Related Fields', value: 'Related Fields' },
    ],
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'h4',
      heading: 'If you have date fields in your file, Select a date format',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    // heading: 'If you have date fields in your file, Select a date format',
    componentProps: {
      name: 'date',
      label: 'Select',
      select: true,
    },
    options: [
      { head: 'head' },
      { label: 'Mandatory Fields', value: 'Mandatory Fields' },
      { label: 'Date', value: 'Date' },
      { label: 'Amount', value: 'Amount' },
      { label: 'optional Fields', value: 'optional Fields' },
      { label: 'Related Fields', value: 'Related Fields' },
    ],
    component: RHFTextField,
    md: 4,
  },
];
