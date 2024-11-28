import { RHFDateRangePicker, RHFTextField } from '@/components/ReactHookForm';

export const defaultValues = (filterValues: any) => {
  return {
    dateRange: filterValues?.dateRange ?? {
      startDate: '',
      endDate: '',
      key: 'selection',
    },
    recipient: filterValues?.recipient ?? '',
    minAmount: filterValues?.minAmount ?? '',
    maxAmount: filterValues?.maxAmount ?? '',
  };
};

export const transactionFilterData = [
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
      name: 'recipient',
      label: 'Recipient',
      placeholder: 'Enter Recipient',
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'minAmount',
      label: 'Minimum Amount',
      placeholder: 'Enter Minimum Amount',
    },
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      name: 'maxAmount',
      label: 'Maximum Amount',
      placeholder: 'Enter Maximum Amount',
    },
    component: RHFTextField,
  },
];
