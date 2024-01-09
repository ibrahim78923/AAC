import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import {
  CONTRACT_STATUS,
  CONTRACT_TYPES,
  TIME_PERIODS,
} from '@/constants/strings';

export const contractTypeOptions = [
  'All',
  CONTRACT_TYPES?.LEASE,
  CONTRACT_TYPES?.MAINTENANCE,
  CONTRACT_TYPES?.SOFTWARE_LICENSE,
  CONTRACT_TYPES?.WARRANTY,
];

const contractStatusOptions = [
  { _id: CONTRACT_STATUS?.DRAFT, label: CONTRACT_STATUS?.DRAFT },
  {
    _id: CONTRACT_STATUS?.PENDING_APPROVAL,
    label: CONTRACT_STATUS?.PENDING_APPROVAL,
  },
  { _id: CONTRACT_STATUS?.APPROVED, label: CONTRACT_STATUS?.APPROVED },
  { _id: CONTRACT_STATUS?.EXPIRED, label: CONTRACT_STATUS?.EXPIRED },
  { _id: CONTRACT_STATUS?.REJECTED, label: CONTRACT_STATUS?.REJECTED },
  { _id: CONTRACT_STATUS?.TERMINATED, label: CONTRACT_STATUS?.TERMINATED },
];

const expiryOptions = [
  {
    _id: TIME_PERIODS?.NONE,
    label: TIME_PERIODS?.NONE,
  },
  {
    _id: TIME_PERIODS?.ALL_TIME,
    label: TIME_PERIODS?.ALL_TIME,
  },
  {
    _id: TIME_PERIODS?.TODAY,
    label: TIME_PERIODS?.TODAY,
  },
  {
    _id: TIME_PERIODS?.YESTERDAY,
    label: TIME_PERIODS?.YESTERDAY,
  },
  {
    _id: TIME_PERIODS?.PREVIOUS_WEEK,
    label: TIME_PERIODS?.PREVIOUS_WEEK,
  },
  {
    _id: TIME_PERIODS?.PREVIOUS_MONTH,
    label: TIME_PERIODS?.PREVIOUS_MONTH,
  },
  {
    _id: TIME_PERIODS?.NEXT_WEEK,
    label: TIME_PERIODS?.NEXT_WEEK,
  },
  {
    _id: TIME_PERIODS?.NEXT_MONTH,
    label: TIME_PERIODS?.NEXT_MONTH,
  },
];

export const contractsFilterFormDefaultValues = (data?: any) => {
  return {
    type: data?.type ?? null,
    status: data?.status ?? null,
    vender: data?.vender ?? null,
    expiry: data?.expiry ?? null,
  };
};

export const contractsFilterFormFieldsDynamic = (
  apiQueryContractType: any,
  apiQueryVendor: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'type',
      label: 'Contract Type',
      fullWidth: true,
      placeholder: 'All',
      apiQuery: apiQueryContractType,
      externalParams: { limit: 50 },
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 2,
    componentProps: {
      name: 'status',
      label: 'Contract Status',
      placeholder: 'Any',
      fullWidth: true,
      options: contractStatusOptions,
      getOptionLabel: (option: any) => option?.label?.replaceAll?.('_', ' '),
    },
    component: RHFAutocomplete,
  },
  {
    id: 3,
    componentProps: {
      name: 'vender',
      label: 'Vendor',
      fullWidth: true,
      placeholder: 'Select Vendor',
      apiQuery: apiQueryVendor,
      externalParams: { meta: false, limit: 50 },
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 4,
    componentProps: {
      name: 'expiry',
      label: 'Expiry',
      fullWidth: true,
      placeholder: 'Select Expiry',
      options: expiryOptions,
      getOptionLabel: (option: any) => option?.label?.replaceAll?.('_', ' '),
    },
    component: RHFAutocomplete,
  },
];
