import {
  RHFAutocomplete,
  RHFDateRangePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
const optionsVisibleType = ['Hello', 'Hello'];
const optionsVisibleShop = ['Shop 1', 'Shop 2'];
const optionsVisibleChannel = ['Channel 1', 'Channel 2'];
export const defaultValues = {
  type: null,
  dateRange: {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  },
  shop: null,
  minAmount: '',
  maxAmount: '',
  channel: null,
};
export const transactionFilterDrawerData = [
  {
    id: 1,
    componentProps: {
      name: 'type',
      label: 'Type',
      options: optionsVisibleType,
      placeholder: 'Select',
    },
    component: RHFAutocomplete,
    md: 12,
  },
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
    id: 3,
    componentProps: {
      name: 'shop',
      label: 'Shop',
      options: optionsVisibleShop,
      placeholder: 'Select',
    },
    component: RHFAutocomplete,
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
  {
    id: 6,
    componentProps: {
      name: 'channel',
      label: 'Channel',
      options: optionsVisibleChannel,
      placeholder: 'Select Channel',
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
