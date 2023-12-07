import { RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';
export const AddAccountArray = [
  {
    componentProps: {
      label: 'Products',
      name: 'products',
      fullWidth: true,
      select: true,
      required: true,
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
      label: 'Company',
      name: 'company',
      fullWidth: true,
      select: true,
      required: true,
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
      label: 'Manage Role',
      name: 'manageRole',
      fullWidth: true,
      select: true,
      required: true,
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
      label: 'Status',
      name: 'status',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
    component: RHFSelect,
    md: 6,
  },
];
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
