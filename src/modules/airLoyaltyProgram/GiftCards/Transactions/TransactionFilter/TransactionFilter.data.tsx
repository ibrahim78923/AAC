import { RHFDateRangePicker, RHFTextField } from '@/components/ReactHookForm';
export const defaultValues = {
  dateRange: {
    startDate: null,
    endDate: null,
    key: 'selection',
  },
  recipient: '',
  minAmount: '',
  maxAmount: '',
};
export const transactionFilterData = [
  {
    id: 2,
    componentProps: {
      name: 'dateRange',
      label: 'Date Range',
      placeholder: 'Select Date',
    },
    component: RHFDateRangePicker,
    md: 12,
  },
  {
    id: 4,
    componentProps: {
      name: 'recipient',
      label: 'Recipient',
      placeholder: 'Enter Recipient',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 4,
    componentProps: {
      name: 'minAmount',
      label: 'Minimum Amount',
      placeholder: 'Enter Minimum Amount',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 5,
    componentProps: {
      name: 'maxAmount',
      label: 'Maximum Amount',
      placeholder: 'Enter Maximum Amount',
    },
    component: RHFTextField,
    md: 12,
  },
];
