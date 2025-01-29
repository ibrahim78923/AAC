import { RHFDateRangePicker, RHFTextField } from '@/components/ReactHookForm';

export const giftCardDetailsDefaultValues = (data?: any) => {
  return {
    dateRange: data?.dateRange ?? {
      startDate: '',
      endDate: '',
      key: 'selection',
    },
    minAmount: data?.minAmount ?? '',
    maxAmount: data?.maxAmount ?? '',
  };
};
export const giftCardDetailsFilterFromFields = [
  {
    _id: 1,
    componentProps: {
      name: 'dateRange',
      label: 'Date Range',
      placeholder: 'Select Date',
    },
    component: RHFDateRangePicker,
  },
  {
    _id: 2,
    componentProps: {
      name: 'minAmount',
      label: 'Minimum amount',
      placeholder: 'Enter Minimum Amount',
    },
    component: RHFTextField,
  },
  {
    _id: 3,
    componentProps: {
      name: 'maxAmount',
      label: 'Maximum amount',
      placeholder: 'Enter Maximum Amount',
    },
    component: RHFTextField,
  },
];
