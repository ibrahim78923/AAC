import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const assignedPhysicalGiftFilterValidationSchema = Yup?.object()?.shape({
  minimumCurrentAmount: Yup?.string(),
  active: Yup?.string(),
  upgradeAble: Yup?.string(),
  maximumCurrentAmount: Yup?.string(),
});

export const assignedPhysicalGiftFilterDefaultValues = (data?: any) => {
  return {
    minAmount: data?.minAmount ?? '',
    maxAmount: data?.maxAmount ?? '',
    active: data?.active ?? null,
    upgradeable: data?.upgradeable ?? null,
  };
};

const optionsActive = ['Yes', 'No'];
const optionsUpgradeable = ['Yes', 'No'];
export const assignedPhysicalGiftFilterDataArray = [
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
      name: 'active',
      label: 'Active',
      options: optionsActive,
      placeholder: 'Yes',
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
