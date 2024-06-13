import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const templateValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is required'),
  category: Yup?.string()?.required('Field is required'),
  language: Yup?.string()?.required('Field is required'),
  detail: Yup?.string()?.required('Field is required'),
});

export const createTemplateDataArray = [
  {
    componentProps: {
      name: 'name',
      label: 'Template Name',
      fullWidth: true,
      required: true,
      placeholder: 'Enter Name',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'category',
      label: 'Category',
      placeholder: 'Select Category',
      fullWidth: true,
      required: true,
      options: [
        'Account Update',
        'Ticket Update',
        'Alert Update',
        'Appointment Update',
        'Personal finance Update',
        'Shopping Update',
        'Payment Update',
        'Other',
      ],
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      name: 'language',
      label: 'Language',
      fullWidth: true,
      required: true,
      placeholder: 'Select Language',
      options: [
        'English',
        'Armenian',
        'Dinka',
        'Kirundi',
        'Azerbaijani',
        'Turkmen',
        'Uzbek',
        'Kurdish',
      ],
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      name: 'detail',
      label: 'Details',
      fullWidth: true,
      required: true,
      placeholder: 'Type',
      multiline: true,
      rows: 4,
    },
    component: RHFTextField,
    md: 12,
  },
];
