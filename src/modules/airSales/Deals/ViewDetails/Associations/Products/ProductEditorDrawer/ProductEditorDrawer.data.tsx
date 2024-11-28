import {
  RHFAutocompleteAsync,
  RHFDropZone,
  RHFEditor,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import { PRODUCTS_TYPE } from '@/constants';
import * as Yup from 'yup';

export const productsValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.when('productType', ([pro]: any, field: any) =>
    pro === PRODUCTS_TYPE?.NEW_PRODUCT
      ? field?.required('Field is required')
      : field?.optional(),
  ),
  purchasePrice: Yup?.string()
    ?.nullable()
    ?.when('productType', ([pro]: any, field: any) =>
      pro === PRODUCTS_TYPE?.NEW_PRODUCT
        ? field?.required('Field is required')
        : field?.optional(),
    ),
  unitPrice: Yup?.string()
    ?.nullable()
    ?.when('productType', ([pro]: any, field: any) =>
      pro === PRODUCTS_TYPE?.NEW_PRODUCT
        ? field?.required('Field is required')
        : field?.optional(),
    ),
  sku: Yup?.string()
    ?.nullable()
    ?.when('productType', ([pro]: any, field: any) =>
      pro === PRODUCTS_TYPE?.NEW_PRODUCT
        ? field?.required('Field is required')
        : field?.optional(),
    ),
  category: Yup?.object()
    ?.nullable()
    ?.when('productType', ([pro]: any, field: any) =>
      pro === PRODUCTS_TYPE?.NEW_PRODUCT
        ? field?.required('Field is required')
        : field?.optional(),
    ),
  chooseProduct: Yup?.string()?.when('productType', ([pro]: any, field: any) =>
    pro !== PRODUCTS_TYPE?.NEW_PRODUCT
      ? field?.required('Field is required')
      : field?.optional(),
  ),
});

export const productsDefaultValues = {
  productType: 'new-products',
  name: '',
  purchasePrice: null,
  unitPrice: null,
  sku: '',
  category: null,
  associate: '',
  description: '',
  isActive: false,
  image: '',
};

export const productsDataArray = (productCategories: any) => {
  return [
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
        required: true,
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
        placeholder: 'Select category',
        name: 'category',
        label: 'Category',
        apiQuery: productCategories,
        required: true,
        getOptionLabel: (option: any) => `${option?.name}`,
      },
      component: RHFAutocompleteAsync,
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
        name: 'image',
        label: 'Upload',
        fullWidth: true,
      },
      component: RHFDropZone,
      md: 12,
    },
  ];
};

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

export const productRadioOptions = [
  {
    label: 'New Products',
    value: 'new-products',
  },
  {
    label: 'Existing Products',
    value: 'existing-products',
  },
];
