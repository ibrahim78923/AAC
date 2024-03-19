import { RHFAutocomplete } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const productData = [
  {
    icon: {},
    title: 'Deals',
    desc: 'The revenue connected to a company, which is commonly called an oppoetunity',
  },
  {
    icon: {},
    title: 'Contacts',
    desc: 'The people you work with, commonly called leads or customers',
  },
  {
    icon: {},
    title: 'Tickets',
    desc: 'The issue created form a customer’s request for help',
  },
  {
    icon: {},
    title: 'Companies',
    desc: 'The businesses you work with, which are commonly called accounts or organization',
  },
];

export const productOptions = ['Sales', 'Services', 'Marketing'];

export const importValidationSchema = Yup?.object()?.shape({
  product: Yup?.mixed()?.required('Required'),
});

export const importDefaultValues = {
  product: null,
};

export const importField = [
  {
    id: 3,
    componentProps: {
      name: 'product',
      label: 'Product',
      required: true,
      options: productOptions,
      placeholder: 'Select product',
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
