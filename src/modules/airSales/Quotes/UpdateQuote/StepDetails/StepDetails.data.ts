import {
  RHFSelect,
  RHFTextField,
  RHFDatePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  quoteTemplate: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  quoteTemplate: '',
};

export const formFields = [
  {
    md: 12,
    component: RHFSelect,
    options: [
      { value: 'basic', label: 'Basic' },
      { value: 'original', label: 'Original' },
    ],
    componentProps: {
      name: 'quoteTemplate',
      label: 'Select Quote template',
      fullWidth: true,
      select: true,
      required: true,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'quoteName',
      label: 'Quote Name ',
      fullWidth: true,
      required: true,
    },
  },
  {
    md: 12,
    component: RHFDatePicker,
    componentProps: {
      name: 'quoteExpiration',
      label: 'Quote Expiration Date',
      fullWidth: true,
      required: true,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'quoteNotes',
      label: 'Notes',
      fullWidth: true,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'quoteTerms',
      label: 'Terms and Condition for purchase',
      fullWidth: true,
    },
  },
];

export const templateField = [
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'templateComment',
      fullWidth: true,
      placeholder: 'Write comment here...',
      multiline: true,
      rows: 3,
    },
  },
];
