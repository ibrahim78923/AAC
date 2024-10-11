import {
  RHFAutocompleteAsync,
  RHFDateRangePicker,
} from '@/components/ReactHookForm';

export const filtersDefaultValues: any = (filterValue: any) => {
  return {
    consumer: filterValue?.consumer ?? '',
    dateRange: filterValue?.dateRange ?? {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  };
};

export const pointsFilterFormFieldsDynamic = (shopApiQuery?: any) => [
  {
    id: 1,
    componentProps: {
      name: 'consumer',
      label: 'Consumer',
      placeholder: 'Select',
      apiQuery: shopApiQuery,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 5,
    componentProps: {
      name: 'dateRange',
      label: 'Credits',
      placeholder: 'Select',
    },
    component: RHFDateRangePicker,
  },
];
