import { RHFAutocomplete } from '@/components/ReactHookForm';

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
  {
    label: 'Approved',
    value: 'Approved',
  },
  {
    label: 'Cancelled',
    value: 'Cancelled',
  },
  {
    label: 'Closed',
    value: 'Closed',
  },
  {
    label: 'Open',
    value: 'Open',
  },
  {
    label: 'Ordered',
    value: 'Ordered',
  },
  {
    label: 'Partly Received',
    value: 'Partly Received',
  },
  {
    label: 'Pending approval',
    value: 'Pending approval',
  },
  {
    label: 'Received',
    value: 'Received',
  },
  {
    label: 'Rejected',
    value: 'Rejected',
  },
];

export const createdDateOptions = [
  {
    label: 'None',
    value: 'None',
  },
  {
    label: 'AllTime',
    value: 'AllTime',
  },
  {
    label: 'Today',
    value: 'Today',
  },
  {
    label: 'Yesterday',
    value: 'Yesterday',
  },
  {
    label: 'Previous Week',
    value: 'Previous Week',
  },
  {
    label: 'Previous Month',
    value: 'Previous Month',
  },
];

export const deliveryDateOptions = [
  ...createdDateOptions,
  {
    label: 'Next Month',
    value: 'Next Month',
  },
  {
    label: 'Next week',
    value: 'Next week',
  },
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

export const filterFields = [
  {
    id: 2,
    component: RHFAutocomplete,
    gridLength: 12,
    componentProps: {
      placeholder: 'Select Vendor',
      fullWidth: true,
      name: 'vendor',
      label: 'Vendor',
      select: true,
      options: venderOptions,
    },
  },
  {
    id: 920,
    componentProps: {
      placeholder: 'Select Status',
      fullWidth: true,
      name: 'status',
      label: 'Status',
      select: true,
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
      select: true,
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
      select: true,
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
      select: true,
      options: departmentOptions,
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
];
