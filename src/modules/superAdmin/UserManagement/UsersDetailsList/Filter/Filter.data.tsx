import { RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  product: Yup.string().trim().required('Field is Required'),
  company: Yup.string().trim().required('Field is Required'),
  status: Yup.string().trim().required('Field is Required'),
});

export const defaultValues = {
  status: '',
  product: '',
  company: '',
};

export const dataArray = [
  {
    title: 'Status',
    componentProps: {
      name: 'status',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inActive', label: 'In Active' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    title: 'Product',
    componentProps: {
      name: 'product',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'serviceCart', label: 'Service Cart' },
      { value: 'marketingCart', label: 'Marketing Cart' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    title: 'Company',
    componentProps: {
      name: 'company',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'orcaloHoldings', label: 'Orcalo Holdings' },
      { value: 'airAppleCart', label: 'Air applecart' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
