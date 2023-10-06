import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

// existing products
export const existingProductsValidationSchema = Yup.object().shape({
  searchProduct: Yup.string().required('Field is Required'),
});

export const existingProductsDefaultValues = {
  searchProduct: '',
};

export const existingProductsFields = [
  {
    componentProps: {
      name: 'searchProduct',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'BE', label: 'BE' },
      { value: 'FE', label: 'FE' },
      { value: 'BA', label: 'BA' },
      { value: 'Annually', label: 'Desing' },
      { value: 'every_two_years', label: 'Every Two Years' },
      { value: 'every_three_years', label: 'Every Three Years' },
    ],
    component: RHFSelect,
    md: 12,
  },
];

// custom products
export const customValidationSchema = Yup.object().shape({
  name: Yup.string().required('Field is Required'),
  sku: Yup.string().required('Field is Required'),
  category: Yup.string().required('Field is Required'),
  description: Yup.string().required('Field is Required'),
  unitPrice: Yup.string().required('Field is Required'),
  billingFrequency: Yup.string().required('Field is Required'),
  createdDate: Yup.string().required('Field is Required'),
  createTime: Yup.string().required('Field is Required'),
});

export const customDefaultValues = {
  name: '',
  sku: '',
  category: '',
  description: '',
  unitPrice: '',
  billingFrequency: '',
  createdDate: '',
  createTime: '',
};

export const customFields = [
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'sku',
      label: 'SKU',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'inventory', label: 'Inventory' },
      { value: 'non_inventory', label: 'Non-Inventory' },
      { value: 'service', label: 'Service' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'unitPrice',
      label: 'Unit Price',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'billingFrequency',
      label: 'Blling Frequency',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'monthly', label: 'Monthly' },
      { value: 'quarterly', label: 'Quarterly' },
      { value: 'semi_annually', label: 'Semi-annually' },
      { value: 'Annually', label: 'Desing' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'createdTime',
      label: 'Created Time',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
];
