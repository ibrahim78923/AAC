import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';

export const venderOptions = [
  {
    label: 'Dell',
    value: 'Dell',
  },
  {
    label: 'Apple',
    value: 'Apple',
  },
  {
    label: 'Microsoft',
    value: 'Microsoft',
  },
  {
    label: 'Huawei',
    value: 'Huawei',
  },
  {
    label: 'Hp',
    value: 'Hp',
  },
];

export const statusOptions = [
  'Approved',

  'Cancelled',

  'Closed',
  'Open',

  'Ordered',
  'Partly Received',
  'Pending approval',
  'Received',
  'Rejected',
];

export const createdDateOptions = [
  'None',
  'AllTime',
  'Today',
  'Yesterday',
  'Previous Week',
  'Previous Month',
];

export const deliveryDateOptions = [
  ...createdDateOptions,
  'Next Month',

  'Next week',
];

export const departmentOptions = [
  {
    label: 'IT',
    value: 'IT',
  },
  {
    label: 'Operations',
    value: 'Operations',
  },
  {
    label: 'Microsoft',
    value: 'Microsoft',
  },
];

export const defaultValues = {
  vendor: '',
  status: '',
  createdDate: '',
  deliverDate: '',
  department: '',
};

export const filterFields = (vendorDropdown: any, departmentDropdown: any) => [
  {
    id: 2,
    component: RHFAutocompleteAsync,
    gridLength: 12,
    componentProps: {
      placeholder: 'Select Vendor',
      fullWidth: true,
      name: 'vendor',
      label: 'Vendor',
      apiQuery: vendorDropdown,
    },
  },
  {
    id: 920,
    componentProps: {
      placeholder: 'Select Status',
      fullWidth: true,
      name: 'status',
      label: 'Status',
      options: statusOptions,
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
  {
    id: 150,
    componentProps: {
      placeholder: 'Select time period',
      fullWidth: true,
      name: 'createdDate',
      label: 'Created Date',
      options: createdDateOptions,
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
  {
    id: 200,
    component: RHFAutocomplete,
    gridLength: 12,
    componentProps: {
      placeholder: 'Select time period',
      fullWidth: true,
      name: 'deliverDate',
      label: 'Deliver Date',
      options: deliveryDateOptions,
    },
  },
  {
    id: 129,
    componentProps: {
      placeholder: 'Select Department',
      fullWidth: true,
      name: 'department',
      label: 'Department',
      apiQuery: departmentDropdown,
    },
    gridLength: 12,
    component: RHFAutocompleteAsync,
  },
];
