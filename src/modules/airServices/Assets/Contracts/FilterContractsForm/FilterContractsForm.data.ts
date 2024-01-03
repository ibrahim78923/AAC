import { RHFAutocomplete } from '@/components/ReactHookForm';

const contractTypeOptions = [
  'All',
  'Lease',
  'Maintenance',
  'Software License',
  'Warranty',
];

const contractStatusOptions = [
  'Draft',
  'Pending Approval',
  'Approved',
  'Expired',
  'Rejected',
  'Terminated',
];

const vendorOptions = ['Microsoft', 'Dell', 'Apple', 'Samsung'];

const expiryOptions = [
  'None',
  'All Time',
  'Today',
  'Yesterday',
  'Previous Week',
  'Previous Month',
  'Next Week',
  'Next Month',
];

export const defaultValues = {
  type: '',
  status: '',
  vender: '',
  expiry: '',
};

export const filterContractsFormDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'type',
      label: 'Contract Type',
      fullWidth: true,
      placeholder: 'All Assets',
      options: contractTypeOptions,
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
      options: vendorOptions,
    },
    component: RHFAutocomplete,
  },
  {
    id: 4,
    componentProps: {
      name: 'expiry',
      label: 'Expiry',
      fullWidth: true,
      placeholder: 'Select Expiry',
      options: expiryOptions,
    },
    component: RHFAutocomplete,
  },
];
