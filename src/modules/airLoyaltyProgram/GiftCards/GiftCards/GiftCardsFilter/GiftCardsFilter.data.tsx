import {
  RHFAutocomplete,
  RHFDateRangePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ACTIVITY_STATUS_MENU } from '@/constants';

const statusOptions = [
  ACTIVITY_STATUS_MENU?.ACTIVE,
  ACTIVITY_STATUS_MENU?.INACTIVE,
  ACTIVITY_STATUS_MENU?.EXPIRED,
];

export const giftCardDefaultValues = (data?: any) => {
  return {
    dateRange: data?.dateRange ?? {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
    minAmount: data?.minAmount ?? '',
    maxAmount: data?.maxAmount ?? '',
    status: data?.status ?? null,
  };
};
export const giftCardFilterFromFields = [
  {
    id: 1,
    componentProps: {
      name: 'minAmount',
      label: 'Minimum current amount',
      placeholder: 'Enter Minimum Amount',
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'maxAmount',
      label: 'Maximum current amount',
      placeholder: 'Enter Maximum Amount',
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'status',
      label: 'Status',
      placeholder: 'Enter status',
      options: statusOptions,
    },
    component: RHFAutocomplete,
  },
  {
    id: 4,
    componentProps: {
      name: 'dateRange',
      label: 'Date Range',
      placeholder: 'Select Date',
    },
    component: RHFDateRangePicker,
  },
];
