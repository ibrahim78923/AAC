import { RHFEditor, RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
export const addFaqsValidationSchema = Yup.object().shape({
  faqCategory: Yup.string().trim().required('Field is Required'),
  faqQuestion: Yup.string().trim().required('Field is Required'),
  faqAnswer: Yup.string().trim().required('Field is Required'),
});

export const addFaqsDefaultValues = {
  faqCategory: '',
  faqQuestion: '',
  faqAnswer: '',
};

export const addFaqsFiltersDataArray = [
  {
    componentProps: {
      name: 'faqCategory',
      label: 'Select FAQ Category',
      select: true,
    },
    options: [
      { value: 'SALES', label: 'Sales' },
      { value: 'MARKETING', label: 'Marketing' },
      { value: 'SERVICES', label: 'Services' },
      { value: 'OPERATIONS', label: 'Operations' },
      { value: 'LOYALTY_PROGRAM', label: 'Loyalty Program' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'faqQuestion',
      label: 'Question',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'faqAnswer',
      label: 'Answer',
    },
    component: RHFEditor,
    md: 12,
  },
];
