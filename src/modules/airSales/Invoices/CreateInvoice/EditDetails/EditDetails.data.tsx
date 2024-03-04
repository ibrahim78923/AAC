import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const productTotalDetails = [
  {
    title: 'Subtotal',
    value: '£75',
    detail: [
      { title: 'Tax', value: '20%' },
      { title: 'Unit Discount', value: '30 GBP' },
    ],
  },
];

export const validationSchema = Yup?.object()?.shape({
  Quote: Yup?.mixed()?.nullable()?.required('Required'),
});

export const defaultValues: any = {
  Quote: null,
};

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
