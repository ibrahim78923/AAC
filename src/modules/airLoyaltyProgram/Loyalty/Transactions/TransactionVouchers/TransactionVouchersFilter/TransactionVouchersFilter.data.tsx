import {
  RHFAutocompleteAsync,
  RHFDateRangePicker,
} from '@/components/ReactHookForm';

export const filtersDefaultValues: any = (filterValue: any) => {
  return {
    consumer: filterValue?.consumer ?? null,
    voucherRedeemed: filterValue?.voucherRedeemed ?? null,
    dateRange: filterValue?.dateRange ?? {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  };
};

export const vouchersFilterFormFieldsDynamic = (
  consumerApiQuery: any,
  shopApiQuery?: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'consumer',
      label: 'Consumer',
      placeholder: 'Select',
      apiQuery: consumerApiQuery,
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 2,
    componentProps: {
      name: 'voucherRedeemed',
      label: 'Voucher Redeemed',
      placeholder: 'Select Voucher',
      apiQuery: shopApiQuery,
      externalParams: { meta: false },
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
