import {
  RHFTextField,
  RHFSelect,
  // RHFRadioGroup,
  RHFEditor,
  RHFCheckbox,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  productName: Yup?.string()?.required('Field is Required'),
  unitPrice: Yup?.string()?.required('Field is Required'),
});

export const initValues = {
  productType: 'Custom Line Item',
  productName: '',
  SKU: '',
  category: '',
  description: '',
  isActiveProduct: true,
  unitPrice: '',
  createdDate: '',
};

export const addContactFields = [
  {
    id: 'productName',
    component: RHFTextField,
    componentProps: {
      name: 'name',
      label: 'Product Name',
      placeholder: 'Enter here',
      required: 'true',
    },
  },
  {
    id: 'SKU',
    component: RHFTextField,
    componentProps: {
      name: 'sku',
      label: 'SKU',
      placeholder: 'Enter here',
    },
  },

  {
    id: 'category',
    component: RHFSelect,
    componentProps: {
      name: 'category',
      label: 'Category',
      select: true,
      placeholder: 'Select',
    },
    options: [
      { value: 'Inventory', label: 'Inventory' },
      { value: 'Non_Inventory', label: 'Non_Inventory' },
      { value: 'Service', label: 'Service' },
    ],
  },
  {
    id: 'description',
    component: RHFEditor,
    componentProps: {
      name: 'description',
      label: 'Description',
    },
  },
  {
    id: 'isActiveProduct',
    component: RHFCheckbox,
    componentProps: {
      name: 'isActive',
      label: 'Active Product',
    },
  },
  {
    id: 'unitPrice',
    component: RHFTextField,
    componentProps: {
      name: 'unitPrice',
      label: 'Unit Price (£)',
      placeholder: 'Enter here',
      required: 'true',
    },
  },
  {
    id: 'createdDate',
    component: RHFTextField,
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      placeholder: '01/01/2022',
    },
  },
];
