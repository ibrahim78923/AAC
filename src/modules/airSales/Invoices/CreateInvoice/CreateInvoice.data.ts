import { RHFAutocompleteAsync } from '@/components/ReactHookForm';

export const getDataArray = (QuoteData: any) => {
  return [
    {
      id: 1,
      componentProps: {
        name: 'Quote',
        label: 'Select Quote (Please select Quote)',
        placeholder: 'Select Quote',
        fullWidth: true,
        apiQuery: QuoteData,
        getOptionLabel: (option: any) => option?.name,
        // externalParams: {},
        required: true,
      },
      component: RHFAutocompleteAsync,
    },
  ];
};
