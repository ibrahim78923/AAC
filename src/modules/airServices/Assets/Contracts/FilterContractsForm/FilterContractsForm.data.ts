import { RHFAutocomplete } from '@/components/ReactHookForm';
import * as Yup from 'yup';

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

export const filterContractsFormValidationSchema = Yup?.object()?.shape({
  type: Yup?.string(),
  status: Yup?.string(),
  vender: Yup?.string(),
  expiry: Yup?.string(),
});

export const defaultValues = {
  type: '',
  status: '',
  vender: '',
  expiry: '',
};

export const filterContractsFormDataArray = [
  {
    componentProps: {
      name: 'type',
      label: 'Contract Type',
      fullWidth: true,
      placeholder: 'All Assets',
      select: true,
      options: contractTypeOptions,
    },
    component: RHFAutocomplete,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Contract Status',
      placeholder: 'Any',
      fullWidth: true,
      select: true,
      options: contractStatusOptions,
    },
    component: RHFAutocomplete,
  },
  {
    componentProps: {
      name: 'vender',
      label: 'Vendor',
      fullWidth: true,
      select: true,
      placeholder: 'Select Vendor',
      options: vendorOptions,
    },
    component: RHFAutocomplete,
  },
  {
    componentProps: {
      name: 'expiry',
      label: 'Expiry',
      fullWidth: true,
      placeholder: 'Select Expiry',
      select: true,
      options: expiryOptions,
    },
    component: RHFAutocomplete,
  },
];
