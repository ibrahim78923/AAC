import {
  RHFAutocompleteAsync,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';

export const editFaqsDataArray = (onViewDisabled: boolean, products: any) => {
  return [
    {
      md: 12,
      component: RHFAutocompleteAsync,
      componentProps: {
        name: 'faqCategory',
        label: 'Select FAQ Category',
        placeholder: 'Select product',
        apiQuery: products,
        getOptionLabel: (option: any) => option?.name,
      },
    },
    {
      componentProps: {
        name: 'faqQuestion',
        label: 'Question',
        disabled: onViewDisabled,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'faqAnswer',
        label: 'Answer',
        disabled: onViewDisabled,
      },
      component: RHFEditor,
      md: 12,
    },
  ];
};
