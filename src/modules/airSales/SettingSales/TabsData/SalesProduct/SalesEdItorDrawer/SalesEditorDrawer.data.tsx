import {
  RHFDropZone,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const salesProductvalidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required'),
  SKU: Yup?.string(),
  purchasePrice: Yup?.string()?.required('Field is Required'),
  category: Yup?.string(),
  description: Yup?.string(),
  activeProduct: Yup?.string(),
  unitPrice: Yup?.string()?.required('Field is Required'),
  upload: Yup?.string(),
});

export const salesProductDefaultValues = {
  name: '',
  SKU: '',
  purchasePrice: '',
  category: '',
  description: '',
  activeProduct: '',
  unitPrice: '',
  upload: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'name',
      label: 'Product Name',
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
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'purchasePrice',
      label: 'Purchase Price',
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
      { value: 'all', label: 'All' },
      { value: 'copyUrl', label: 'Copy URL' },
      { value: 'createDashboard', label: 'Create Dashboard' },
      { value: 'updateDashboard', label: 'Update Dashboard' },
      { value: 'view-dashboard', label: 'View Dashboard' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
  {
    componentProps: {
      name: 'activeProduct',
      label: 'Active Product',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'all', label: 'All' },
      { value: 'copyUrl', label: 'Copy URL' },
      { value: 'createDashboard', label: 'Create Dashboard' },
      { value: 'updateDashboard', label: 'Update Dashboard' },
      { value: 'view-dashboard', label: 'View Dashboard' },
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
      name: 'upload',
      label: 'Upload',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];
