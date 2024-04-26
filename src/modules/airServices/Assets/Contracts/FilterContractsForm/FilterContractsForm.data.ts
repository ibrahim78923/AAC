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
  {
    _id: 'All',
    label: 'All',
  },
  {
    _id: CONTRACT_TYPES?.LEASE,
    label: CONTRACT_TYPES?.LEASE,
  },
  {
    _id: CONTRACT_TYPES?.MAINTENANCE,
    label: CONTRACT_TYPES?.MAINTENANCE,
  },
  {
    _id: CONTRACT_TYPES?.SOFTWARE_LICENSE,
    label: CONTRACT_TYPES?.SOFTWARE_LICENSE,
  },
  {
    _id: CONTRACT_TYPES?.WARRANTY,
    label: CONTRACT_TYPES?.WARRANTY,
  },
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
    contractType: data?.contractType ?? { _id: 'All', label: 'All' },
    status: data?.status ?? null,
    vendor: data?.vendor ?? null,
    expiry: data?.expiry ?? null,
  };
};

export const contractsFilterFormFieldsDynamic = (apiQueryVendor: any) => [
  {
    id: 1,
    componentProps: {
      name: 'contractType',
      label: 'Contract Type',
      fullWidth: true,
      placeholder: 'All',
      options: contractTypeOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
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
      name: 'vendor',
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
