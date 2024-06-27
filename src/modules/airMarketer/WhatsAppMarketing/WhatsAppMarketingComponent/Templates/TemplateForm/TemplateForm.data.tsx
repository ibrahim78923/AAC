import {
  RHFAutocomplete,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const createTemplateValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Field is Required'),
  category: Yup?.string()?.trim()?.required('Field is Required'),
  language: Yup?.string()?.trim()?.required('Field is Required'),
  detail: Yup?.string()?.trim()?.required('Field is Required'),
});

export const createTemplateDefaultValues = {
  name: '',
  category: '',
  language: '',
  detail: '',
  attachment: '',
};

export const createTemplateFiltersDataArray = () => {
  return [
    {
      componentProps: {
        name: 'name',
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
        placeholder: 'Select Category',
        required: true,
        options: [
          'Account Update',
          'Ticket Update',
          'Alert Update',
          'Appointment Update',
          'Personal finance Update',
          'Shopping Update',
          'Payment finance Update',
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
        placeholder: 'Select Language',
        required: true,
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
