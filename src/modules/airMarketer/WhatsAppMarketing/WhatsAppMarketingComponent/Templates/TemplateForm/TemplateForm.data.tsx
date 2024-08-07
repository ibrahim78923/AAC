import {
  RHFAutocomplete,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const createTemplateValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Field is Required'),
  category: Yup?.string()?.trim()?.required('Field is Required'),
  detail: Yup?.string()?.trim()?.required('Field is Required'),
});

export const createTemplateDefaultValues = {
  name: '',
  category: '',
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
        options: ['Authentication', 'Utility', 'Marketing'],
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
