import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const AddAccountValidationSchema = Yup.object().shape({
  products: Yup.string().required('Field is Required'),
  company: Yup.string().required('Field is Required'),
  manageRole: Yup.string().required('Field is Required'),
  status: Yup.string().required('Field is Required'),
});

export const AddAccountDefaultValues = {
  products: '',
  company: '',
  manageRole: '',
  status: '',
};

export const AddAccountArray = [
  {
    componentProps: {
      name: 'products',
      label: 'Products',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'airMarketer', label: 'Air Marketer' },
      { value: 'airSlaes', label: 'Air Sales' },
      { value: 'airOperations', label: 'Air Operations' },
      { value: 'airServices', label: 'Air Services' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'company',
      label: 'Company',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'abc.pvt.ltd', label: 'ABC.pvt.ltd' },
      { value: 'angalic.pvt', label: 'Angalic.pvt' },
      { value: 'orcaloHoldings', label: 'Orcalo Holdings' },
      { value: 'kbenterprices', label: 'KB Enterprises' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'manageRole',
      label: 'Manage Role',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'accountAdmin', label: 'Account Admin' },
      { value: 'administrator', label: 'Administrator' },
      { value: 'marketingManager', label: 'Marketing Manager' },
    ],
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
    component: RHFSelect,
    md: 6,
  },
];

export const DelegateValidationSchema = Yup.object().shape({
  status: Yup.string().required('Field is Required'),
  fromDate: Yup.date().required('Field is Required'),
  toDate: Yup.date().required('Field is Required'),
});

export const DelegateDefaultValues = {
  status: '',
  fromDate: new Date(),
  toDate: new Date(),
};

export const DelegateArray = [
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'complete', label: 'Complete' },
      { value: 'pending', label: 'Pending' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'fromDate',
      label: 'From Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'toDate',
      label: 'To Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
];
