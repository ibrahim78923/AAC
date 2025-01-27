import {
  RHFAutocompleteAsync,
  RHFDateRangePicker,
} from '@/components/ReactHookForm';

export const filtersDefaultValues: any = (filterValue: any) => {
  return {
    consumer: filterValue?.consumer ?? null,
    rewardRedeemed: filterValue?.rewardRedeemed ?? null,
    dateRange: filterValue?.dateRange ?? {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  };
};

export const rewardsFilterFormFieldsDynamic = (
  consumerApiQuery: any,
  rewardsApiQuery: any,
) => [
  {
    _id: 1,
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
    _id: 2,
    componentProps: {
      name: 'rewardRedeemed',
      label: 'Reward Redeemed',
      placeholder: 'Select Reward',
      fullWidth: true,
      apiQuery: rewardsApiQuery,
      getOptionLabel: (option: any) => option?.title,
    },
    component: RHFAutocompleteAsync,
  },
  {
    _id: 3,
    componentProps: {
      name: 'dateRange',
      label: 'Date Range',
      placeholder: 'Select',
    },
    component: RHFDateRangePicker,
  },
];
