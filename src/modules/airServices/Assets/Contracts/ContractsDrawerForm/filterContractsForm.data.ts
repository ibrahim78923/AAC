import { RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

const contactTypeOptions = [
  {
    value: 'All',
    label: 'All',
  },
  {
    value: 'Lease',
    label: 'Lease',
  },
  {
    value: 'Maintenance',
    label: 'Maintenance',
  },
  {
    value: 'Software License',
    label: 'Software License',
  },
  {
    value: 'Warranty',
    label: 'Warranty',
  },
];

const contactStatusOptions = [
  {
    value: 'Draft',
    label: 'Draft',
  },
  {
    value: 'Pending Approval',
    label: 'Pending Approval',
  },
  {
    value: 'Approved',
    label: 'Approved',
  },
  {
    value: 'Expired',
    label: 'Expired',
  },
  {
    value: 'Rejected',
    label: 'Rejected',
  },
  {
    value: 'Terminated',
    label: 'Terminated',
  },
];

const vendorOptions = [
  {
    value: 'Microsoft',
    label: 'Microsoft',
  },
  {
    value: 'Dell',
    label: 'Dell',
  },
  {
    value: 'Apple',
    label: 'Apple',
  },
  {
    value: 'Samsung',
    label: 'Samsung',
  },
];

const expiryOptions = [
  {
    value: 'None',
    label: 'None',
  },
  {
    value: 'All Time',
    label: 'All Time',
  },
  {
    value: 'Today',
    label: 'Today',
  },
  {
    value: 'Yesterday',
    label: 'Yesterday',
  },
  {
    value: 'Previous Week',
    label: 'Previous Week',
  },
  {
    value: 'Previous Month',
    label: 'Previous Month',
  },
  {
    value: 'Next Week',
    label: 'Next Week',
  },
  {
    value: 'Next Month',
    label: 'Next Month',
  },
];

export const contractsDrawerFormValidationSchema = Yup?.object()?.shape({
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
      label: 'Contact Type',
      fullWidth: true,
      select: true,
    },
    options: contactTypeOptions,
    component: RHFSelect,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Contact Status',
      fullWidth: true,
      select: true,
    },
    options: contactStatusOptions,
    component: RHFSelect,
  },
  {
    componentProps: {
      name: 'vender',
      label: 'Vender',
      fullWidth: true,
      select: true,
    },
    options: vendorOptions,
    component: RHFSelect,
  },
  {
    componentProps: {
      name: 'expiry',
      label: 'Expiry',
      fullWidth: true,
      select: true,
    },
    options: expiryOptions,
    component: RHFSelect,
  },
];
