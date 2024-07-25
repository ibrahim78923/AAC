import {
  RHFAutocompleteAsync,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { FormDataI } from '../FaqInterface';

export const addFaqsDefaultValues: FormDataI = {
  faqCategory: null,
  faqQuestion: '',
  faqAnswer: '',
};

export const addFaqsValidationSchema = Yup.object().shape({
  faqCategory: Yup?.mixed()?.nullable()?.required('Field is Required'),
  faqQuestion: Yup?.string()?.trim()?.required('Field is Required'),
  faqAnswer: Yup?.string()?.trim()?.required('Field is Required'),
});

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
