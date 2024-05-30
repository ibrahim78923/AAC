import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const basicInfoValidationSchema = Yup.object().shape({
  module: Yup.string()?.required('Field is required'),
  section: Yup.string()?.required('Field is required'),
  label: Yup.string()?.required('Field is required'),
});

export const basicInfoDefaultValues = {
  module: '',
  section: '',
  label: '',
};

export const fieldTypeDefaultValues = {
  fieldType: '',
  number: '',
  sort: '',
  search: '',
  label: '',
  preview: '',
  'for-single-preview': '',
  'for-multiple-preview': '',
  date: '',
};
export const basicInfoFields = () => {
  return [
    {
      componentProps: {
        label: 'Module',
        name: 'module',
        placeholder: 'Select Module',
        fullWidth: true,
        options: ['Deal', 'Quote'],
        required: true,
      },
      component: RHFAutocomplete,
      md: 12,
    },
    {
      componentProps: {
        label: 'Section',
        name: 'section',
        placeholder: 'Select Section',
        fullWidth: true,
        required: true,
        options: ['Deal Activity', 'Deal Information'],
      },
      component: RHFAutocomplete,
      md: 12,
    },
    {
      componentProps: {
        label: 'Label',
        name: 'label',
        placeholder: 'Enter Label',
        fullWidth: true,
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
  ];
};

export const fieldTypeFields = () => {
  return [
    {
      componentProps: {
        label: 'Field type',
        name: 'fieldType',
        placeholder: 'Select',
        fullWidth: true,
        options: [
          'Single-line text',
          'Multi-line text',
          'Single Checkbox',
          'Multiple Checkboxes',
          'Dropdown select',
          'Radio select',
          'Date picker',
          'Number',
          'Calculation',
          'Score',
          'File',
        ],
      },
      component: RHFAutocomplete,
      toShowFor: [
        'all',
        'Single-line text',
        'Multi-line text',
        'Single Checkbox',
        'Multiple Checkboxes',
        'Dropdown select',
        'Radio select',
        'Date picker',
        'Number',
        'Calculation',
        'Score',
        'File',
      ],
      md: 12,
    },
    {
      componentProps: {
        label: 'Number Format',
        name: 'number',
        placeholder: 'Select Number',
        fullWidth: true,
        options: ['Formatted Number', 'Unformatted Number', 'Currency'],
      },
      component: RHFAutocomplete,
      toShowFor: ['Number'],
      md: 12,
    },
    {
      componentProps: {
        label: 'Sort',
        name: 'sort',
        placeholder: 'Select Sort',
        fullWidth: true,
        options: ['Custom', 'Alphabetical'],
      },
      component: RHFAutocomplete,
      toShowFor: ['Multiple Checkboxes'],
      md: 12,
    },
    {
      componentProps: {
        label: 'Search',
        name: 'search',
        placeholder: 'search',
        fullWidth: true,
      },
      component: RHFTextField,
      toShowFor: ['Multiple Checkboxes'],
      md: 12,
    },
    {
      componentProps: {
        label: 'Label',
        name: 'label',
        placeholder: 'Enter Label',
        fullWidth: true,
      },
      component: RHFTextField,
      toShowFor: [
        'Single-line text',
        'Multi-line text',
        'Single Checkbox',
        'Number',
        'Multiple Checkboxes',
      ],
      md: 12,
    },
    {
      componentProps: {
        label: 'Preview',
        name: 'preview',
        placeholder: 'Enter Preview',
        fullWidth: true,
        multiline: true,
        rows: 3,
      },
      component: RHFTextField,
      toShowFor: ['Single-line text', 'Multi-line text', 'Number'],
      md: 12,
    },
    {
      componentProps: {
        label: 'Preview',
        name: 'for-single-preview',
        placeholder: 'Select preview',
        fullWidth: true,
        options: ['Yes', 'No'],
      },
      component: RHFAutocomplete,
      toShowFor: ['Single Checkbox'],
      md: 12,
    },
    {
      componentProps: {
        label: 'Preview',
        name: 'for-multiple-preview',
        placeholder: 'Select preview',
        fullWidth: true,
        options: ['123 abc'],
      },
      component: RHFAutocomplete,
      toShowFor: ['Multiple Checkboxes'],
      md: 12,
    },
    {
      componentProps: {
        label: 'Date',
        name: 'date',
        placeholder: 'Select date',
        fullWidth: true,
      },
      component: RHFDatePicker,
      toShowFor: ['Date picker'],
      md: 12,
    },
  ];
};
