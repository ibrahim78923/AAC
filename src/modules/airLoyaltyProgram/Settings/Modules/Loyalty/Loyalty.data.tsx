import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
const optionsVisible = [' Birthday', 'Color', 'Date'];
export const modulesLoyaltyDataGenral = [
  {
    id: 1,
    componentProps: {
      name: 'name',
      label: 'Name',
      placeholder: 'Name',
    },
    component: RHFTextField,
    md: 4,
  },
  {
    id: 2,
    componentProps: {
      name: 'customerCreditName',
      label: 'Customer Credit Name',
      placeholder: 'Customer Credit Name',
    },
    component: RHFTextField,
    md: 4,
  },
  {
    id: 3,
    componentProps: {
      name: 'limit',
      label: 'Limit',
      placeholder: 'e.g 5000',
    },
    component: RHFTextField,
    md: 4,
  },
];

export const modulesLoyaltyDataAttribute = [
  {
    id: 1,
    componentProps: {
      name: 'rewardAttribute',
      label: 'Reward Attribute',
      options: optionsVisible,
      multiple: 'true',
    },
    component: RHFAutocomplete,
    md: 3,
  },
  {
    id: 1,
    componentProps: {
      name: 'transactionAttribute',
      label: 'Transaction Attribute',
      options: optionsVisible,
      multiple: 'true',
    },
    component: RHFAutocomplete,
    md: 3,
  },
];
