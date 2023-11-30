import {
  RHFCheckbox,
  RHFDatePicker,
  RHFDropZone,
  RHFEditor,
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
  { value: 'BE', label: 'BE' },
  { value: 'FE', label: 'FE' },
  { value: 'BA', label: 'BA' },
  { value: 'Annually', label: 'Desing' },
  { value: 'every_two_years', label: 'Every Two Years' },
  { value: 'every_three_years', label: 'Every Three Years' },
];

// custom products
export const customValidationSchema = Yup.object().shape({
  name: Yup.string().required('Field is Required'),
  // sku: Yup.string().required('Field is Required'),
  // category: Yup.string().required('Field is Required'),
  // description: Yup.string().required('Field is Required'),
  unitPrice: Yup.string().required('Field is Required'),
  // billingFrequency: Yup.string().required('Field is Required'),
  // createdDate: Yup.string().required('Field is Required'),
  // createdTime: Yup.string().required('Field is Required'),
});

export const customDefaultValues = {
  name: '',
  sku: '',
  category: '',
  description: '',
  unitPrice: '',
  billingFrequency: '',
  createdDate: '',
  createdTime: '',
};

export const customFields = [
  {
    title: 'Product Name',
    componentProps: {
      name: 'name',
      fullWidth: true,
      placeholder: 'Enter here',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'SKU',
    componentProps: {
      name: 'sku',
      placeholder: 'Enter here',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Category',
    componentProps: {
      name: 'category',
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
    title: 'Description',
    componentProps: {
      name: 'description',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
  {
    componentProps: {
      name: 'isActiveProduct',
      label: 'Active Product',
      fullWidth: true,
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    title: 'Unit Price',
    componentProps: {
      name: 'unitPrice',
      placeholder: 'Enter here',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Billing Frequency',
    componentProps: {
      name: 'billingFrequency',
      placeholder: 'Blling Frequency',
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
    title: 'Created Date',
    componentProps: {
      name: 'createdDate',
      placeholder: '01/01/2023',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    title: 'Created Time',
    componentProps: {
      name: 'createdTime',
      placeholder: 'HH:MM',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'file',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];
