import { RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const userFilterValSchema = Yup.object().shape({
  product: Yup.string().required('Field is Required'),
  company: Yup.string().required('Field is Required'),
  users: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  product: '',
  company: '',
  users: '',
};

export const usersFilterArray = [
  {
    title: 'Product',
    componentProps: {
      name: 'product',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'serviceCart', label: 'Service cart' },
      { value: 'marketingCart', label: 'Marketing cart' },
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
      { value: 'orcaloHolding', label: 'Orcalo Holdings' },
      { value: 'airApplecart', label: 'Air applecart' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    title: 'Users',
    componentProps: {
      name: 'users',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'lesilie', label: 'Lesilie Alexander' },
      { value: 'jermon', label: 'jerome Bell' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
