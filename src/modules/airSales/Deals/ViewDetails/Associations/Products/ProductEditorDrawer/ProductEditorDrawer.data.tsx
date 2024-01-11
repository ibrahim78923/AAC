import {
  RHFDropZone,
  RHFEditor,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const productsValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required'),
  sku: Yup?.string(),
  purchasePrice: Yup?.number()?.required('Field is Required'),
  category: Yup?.string(),
  description: Yup?.string(),
  unitPrice: Yup?.number()?.required('Field is Required'),
});

export const productsDefaultValues = {
  name: '',
  sku: '',
  purchasePrice: null,
  category: '',
  description: '',
  unitPrice: null,
  file: '',
  isActive: false,
  // upload: '',
};

export const productsDataArray = [
  {
    componentProps: {
      name: 'name',
      label: 'Product Name',
      fullWidth: true,
      placeholder: 'Enter here',
      required: true,
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
      placeholder: 'Enter here',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'purchasePrice',
      label: 'Purchase Price',
      fullWidth: true,
      placeholder: 'Enter here',
      required: true,
      type: 'number',
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
      name: 'unitPrice',
      label: 'Unit Price (£)',
      fullWidth: true,
      placeholder: 'Enter here',
      required: true,
      type: 'number',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 13,
    componentProps: {
      name: 'isActive',
      label: 'Active Product',
    },
    component: RHFSwitch,
    md: 12,
  },
  {
    componentProps: {
      name: 'file',
      label: 'Upload',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];
export const productOptions = [
  {
    label: 'Custom Line Item',
    value: 'customLineItem',
  },
  {
    label: 'Existing Products',
    value: 'existingProducts',
  },
];

export const drawerTitle: any = {
  Add: 'Add product',
  Edit: 'Edit product',
  View: 'View product',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
