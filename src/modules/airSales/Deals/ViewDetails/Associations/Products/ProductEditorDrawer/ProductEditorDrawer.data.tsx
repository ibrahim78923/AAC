import {
  RHFCheckbox,
  RHFDropZone,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const productsValidationSchema = Yup?.object()?.shape({
  productName: Yup?.string()?.trim()?.required('Field is Required'),
  unitPrice: Yup?.string()?.trim()?.required('Field is Required'),
});

export const productsDefaultValues = {
  productStatus: 'customLineItem',
  productName: '',
  sku: '',
  description: '',
  category: '',
  activeProducts: '',
  unitPrice: '',
  attachfile: '',
};

export const productsDataArray = [
  {
    componentProps: {
      name: 'productName',
      placeholder: 'Product Name',
      label: 'Product Name',
      required: true,

      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    componentProps: {
      name: 'sku',
      placeholder: 'SKU',
      label: 'SKU',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'category',
      placeholder: '',
      label: 'Category',
      select: true,
    },
    options: [
      {
        value: 'Inventory',
        label: 'Inventory',
      },
      {
        value: 'Non-Inventory',
        label: 'Non-Inventory',
      },
      {
        value: 'Service',
        label: 'Service',
      },
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
      name: 'activeProducts',

      label: 'Active Products',
      fullWidth: true,
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    componentProps: {
      name: 'unitPrice',
      placeholder: 'Price',
      required: true,
      label: 'Unit Price (£) ',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    componentProps: {
      name: 'attachFile',
      placeholder: '',
      label: '',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
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
