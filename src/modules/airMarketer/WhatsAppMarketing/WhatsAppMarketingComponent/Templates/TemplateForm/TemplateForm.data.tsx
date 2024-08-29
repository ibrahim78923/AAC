import {
  RHFAutocomplete,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import * as Yup from 'yup';

export const createTemplateValidationSchema = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    name: Yup?.string()
      ?.trim()
      ?.matches(/^[a-z]+$/, 'Name must not contain uppercase letters or spaces')
      ?.required('Field is Required'),
    category: Yup?.string()?.trim()?.required('Field is Required'),
    detail: Yup?.string()?.trim()?.required('Field is Required'),
    ...formSchema,
  });
};

export const newCreateTemplateDefaultValues = (data?: any, form?: any) => {
  const initialValues: any = dynamicFormInitialValue(data, form);
  return {
    name: data?.name ?? '',
    category: data?.category ?? '',
    detail: data?.detail ?? '',
    attachment: data?.attachment ?? '',
    ...initialValues,
  };
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
