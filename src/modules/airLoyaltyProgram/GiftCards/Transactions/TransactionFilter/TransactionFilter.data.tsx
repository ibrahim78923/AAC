import { RHFDateRangePicker, RHFTextField } from '@/components/ReactHookForm';

export const defaultValues = (filterValues: any) => {
  return {
    dateRange: filterValues?.dateRange ?? {
      startDate: '',
      endDate: '',
      key: 'selection',
    },
    minAmount: filterValues?.minAmount ?? '',
    maxAmount: filterValues?.maxAmount ?? '',
  };
};

export const transactionFilterData = [
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
      label: 'Minimum Amount',
      placeholder: 'Enter Minimum Amount',
    },
    component: RHFTextField,
  },
  {
    _id: 3,
    componentProps: {
      name: 'maxAmount',
      label: 'Maximum Amount',
      placeholder: 'Enter Maximum Amount',
    },
    component: RHFTextField,
  },
];
