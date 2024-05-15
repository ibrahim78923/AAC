import {
  RHFAutocompleteAsync,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';
export const addFaqsValidationSchema = Yup.object().shape({
  faqCategory: Yup.object().required('Field is Required'),
  faqQuestion: Yup.string().trim().required('Field is Required'),
  faqAnswer: Yup.string().trim().required('Field is Required'),
});

export const addFaqsDefaultValues = {
  faqCategory: null,
  faqQuestion: '',
  faqAnswer: '',
};

export const addFaqsFiltersDataArray = (products: any) => {
  return [
    {
      component: RHFAutocompleteAsync,
      md: 12,
      componentProps: {
        name: 'faqCategory',
        label: 'Select FAQ Category',
        placeholder: 'Select product',
        apiQuery: products,
        getOptionLabel: (option: any) => option?.name,
        required: true,
      },
    },
    {
      component: RHFTextField,
      md: 12,
      componentProps: {
        name: 'faqQuestion',
        label: 'Question',
        required: true,
      },
    },
    {
      component: RHFEditor,
      md: 12,
      componentProps: {
        name: 'faqAnswer',
        label: 'Answer',
        required: true,
      },
    },
  ];
};
