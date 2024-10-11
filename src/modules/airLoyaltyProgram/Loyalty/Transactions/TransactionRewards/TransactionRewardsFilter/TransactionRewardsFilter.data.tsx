import {
  RHFAutocompleteAsync,
  RHFDateRangePicker,
} from '@/components/ReactHookForm';

export const filtersDefaultValues: any = (filterValue: any) => {
  return {
    consumer: filterValue?.consumer ?? '',
    rewardRedeemed: filterValue?.rewardRedeemed ?? null,
    dateRange: filterValue?.dateRange ?? {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  };
};

export const rewardsFilterFormFieldsDynamic = (shopApiQuery?: any) => [
  {
    id: 1,
    componentProps: {
      name: 'consumer',
      label: 'Consumer',
      placeholder: 'Select',
      apiQuery: shopApiQuery,
      getOptionLabel: (option: any) => option?.name,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 2,
    componentProps: {
      name: 'rewardRedeemed',
      label: 'Reward Redeemed',
      placeholder: 'Select Reward',
      fullWidth: true,
      apiQuery: shopApiQuery,
      getOptionLabel: (option: any) => option?.name,
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
