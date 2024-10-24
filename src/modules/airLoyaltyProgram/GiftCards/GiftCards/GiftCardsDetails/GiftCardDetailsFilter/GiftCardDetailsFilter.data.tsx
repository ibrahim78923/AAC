import { RHFDateRangePicker, RHFTextField } from '@/components/ReactHookForm';

export const giftCardDetailsDefaultValues = (data?: any) => {
  return {
    dateRange: data?.dateRange ?? {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
    minAmount: data?.minAmount ?? '',
    maxAmount: data?.maxAmount ?? '',
  };
};
export const giftCardDetailsFilterFromFieldsDynamic = () => [
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
      name: 'minAmount',
      label: 'Minimum amount',
      placeholder: 'Enter Minimum Amount',
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'maxAmount',
      label: 'Maximum amount',
      placeholder: 'Enter Maximum Amount',
    },
    component: RHFTextField,
  },
];
