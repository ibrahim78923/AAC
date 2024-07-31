import {
  RHFAutocompleteAsync,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';

export const editFaqsDataArray = (products: any, onViewDisabled?: boolean) => {
  return [
    {
      md: 12,
      component: RHFAutocompleteAsync,
      componentProps: {
        name: 'faqCategory',
        label: 'Select FAQ Category',
        placeholder: 'Select product',
        apiQuery: products,
        externalParams: {
          status: 'active',
        },
        getOptionLabel: (option: any) => option?.name,
        required: true,
        disabled: onViewDisabled,
      },
    },
    {
      componentProps: {
        name: 'faqQuestion',
        label: 'Question',
        disabled: onViewDisabled,
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'faqAnswer',
        label: 'Answer',
        disabled: onViewDisabled,
        required: true,
      },
      component: RHFEditor,
      md: 12,
    },
  ];
};
