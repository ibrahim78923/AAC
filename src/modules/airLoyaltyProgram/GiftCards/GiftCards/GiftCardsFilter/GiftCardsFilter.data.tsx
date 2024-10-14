import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { ACTIVITY_STATUS_MENU } from '@/constants';

const statusOptions = [
  ACTIVITY_STATUS_MENU?.ACTIVE,
  ACTIVITY_STATUS_MENU?.INACTIVE,
  ACTIVITY_STATUS_MENU?.EXPIRED,
];
const optionsUpgradeable = ['Yes', 'No'];

export const giftCardDefaultValues = (data?: any) => {
  return {
    minAmount: data?.minAmount ?? '',
    maxAmount: data?.maxAmount ?? '',
    status: data?.status ?? null,
    upgradeable: data?.upgradeable ?? null,
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
      options: statusOptions,
    },
    component: RHFAutocomplete,
  },
  {
    id: 4,
    componentProps: {
      name: 'upgradeable',
      label: 'Upgradeable',
      options: optionsUpgradeable,
      placeholder: 'Yes',
    },
    component: RHFAutocomplete,
  },
];
