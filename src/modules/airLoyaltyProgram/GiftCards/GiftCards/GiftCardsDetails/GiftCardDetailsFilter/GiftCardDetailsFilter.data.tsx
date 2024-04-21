import {
  RHFAutocompleteAsync,
  RHFDateRangePicker,
  RHFTextField,
} from '@/components/ReactHookForm';

export const giftCardDetailsDefaultValues = (data?: any) => {
  return {
    dateRange: data?.dateRange ?? {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
    shop: data?.shop ?? null,
    minAmount: data?.minAmount ?? '',
    maxAmount: data?.maxAmount ?? '',
  };
};
export const giftCardDetailsFilterFromFieldsDynamic = (shopApiQuery: any) => [
  {
    id: 1,
    componentProps: {
      name: 'dateRange',
      label: 'Date Range',
      placeholder: 'Select Date',
    },
    component: RHFDateRangePicker,
  },
  {
    id: 2,
    componentProps: {
      name: 'shop',
      label: 'Shop',
      placeholder: 'Select',
      apiQuery: shopApiQuery,
      getOptionLabel: (option: any) => option?.shopName,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 3,
    componentProps: {
      name: 'minAmount',
      label: 'Minimum amount',
      placeholder: 'Enter Minimum Amount',
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'maxAmount',
      label: 'Maximum amount',
      placeholder: 'Enter Maximum Amount',
    },
    component: RHFTextField,
  },
];
