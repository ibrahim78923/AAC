import { RHFAutocompleteAsync } from '@/components/ReactHookForm';

export const getDataArray = (QuoteData: any) => {
  return [
    {
      id: 1,
      componentProps: {
        name: 'Quote',
        label: 'Select Quote (Please select Quote)',
        fullWidth: true,
        apiQuery: QuoteData,
        required: true,
      },
      component: RHFAutocompleteAsync,
    },
  ];
};
