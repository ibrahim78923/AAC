import {
  RHFDropZone,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const createTemplateValidationSchema = Yup?.object()?.shape({
  templateName: Yup?.string()?.trim()?.required('Field is Required'),
  category: Yup?.string()?.trim()?.required('Field is Required'),
  language: Yup?.string()?.trim()?.required('Field is Required'),
  details: Yup?.string()?.trim()?.required('Field is Required'),
  attachment: Yup?.string()?.trim()?.required('Field is Required'),
});

export const createTemplateDefaultValues = {
  templateName: '',
  category: '',
  language: '',
  details: '',
  attachment: '',
};

export const createTemplateFiltersDataArray = () => {
  return [
    {
      componentProps: {
        name: 'templateName',
        label: 'Template Name',
        placeholder: 'Enter Name',
        fullWidth: true,
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'category',
        label: 'Category',
        select: true,
        required: true,
      },
      options: [
        { value: 'Account update', label: 'Account update' },
        { value: 'Ticket Update', label: 'Ticket Update' },
        { value: 'Alert Update', label: 'Alert Update' },
        { value: 'Appointment update', label: 'Appointment update' },
        { value: 'Personal finance update', label: 'Personal finance update' },
        { value: 'Shopping Update', label: 'Shopping Update' },
        { value: 'Payment update', label: 'Payment update' },
        { value: 'Others', label: 'Others' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'language',
        label: 'Language',
        select: true,
        required: true,
      },
      options: [
        { value: 'English', label: 'English' },
        { value: 'Armenian', label: 'Armenian' },
        { value: 'Dinka', label: 'Dinka' },
        { value: 'Kirundi', label: 'Kirundi' },
        { value: 'Azerbaijani', label: 'Azerbaijani' },
        { value: 'Turkmen', label: 'Turkmen' },
        { value: 'Uzbek', label: 'Uzbek' },
        { value: 'Kurdish', label: 'Kurdish' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'details',
        label: 'Details',
        fullWidth: true,
        placeholder: 'Type',
        multiline: true,
        required: true,
        rows: 3,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'attachment',
        label: 'Attachment',
        fullWidth: true,
      },
      component: RHFDropZone,
      md: 12,
    },
  ];
};
