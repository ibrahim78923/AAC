import {
  RHFAutocompleteAsync,
  RHFDatePicker,
} from '@/components/ReactHookForm';

export const filtersDefaultValues: any = (filterValue: any) => {
  return {
    consumer: filterValue?.consumer ?? null,
    date: filterValue?.date ?? null,
  };
};

export const pointsFilterFormFieldsDynamic = (shopApiQuery?: any) => [
  {
    _id: 1,
    componentProps: {
      name: 'consumer',
      label: 'Consumer',
      placeholder: 'Select',
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
      apiQuery: shopApiQuery,
    },
    component: RHFAutocompleteAsync,
  },
  {
    _id: 2,
    componentProps: {
      name: 'date',
      label: 'Created Date',
      placeholder: 'Select Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
  },
];
