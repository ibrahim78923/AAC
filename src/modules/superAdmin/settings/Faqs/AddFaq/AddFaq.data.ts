import { RHFEditor, RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
export const addFaqsValidationSchema = Yup.object().shape({
  selectFaqCategory: Yup.string().trim().required('Field is Required'),
  question: Yup.string().trim().required('Field is Required'),
  answer: Yup.string().trim().required('Field is Required'),
});

export const addFaqsDefaultValues = {
  selectFaqCategory: '',
  question: '',
  answer: '',
};

export const addFaqsFiltersDataArray = [
  {
    componentProps: {
      name: 'selectFaqCategory',
      label: 'Select FAQ Category',
      select: true,
    },
    options: [
      { value: 'Sales', label: 'Sales' },
      { value: 'Marketing', label: 'Marketing' },
      { value: 'Service', label: 'Service' },
      { value: 'Operations', label: 'Operations' },
      { value: 'Loyalty Program', label: 'Loyalty Program' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'question',
      label: 'Question',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'answer',
      label: 'Answer',
    },
    component: RHFEditor,
    md: 12,
  },
];
