import {
  RHFAutocompleteAsync,
  RHFDropZone,
  RHFEditor,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import { PRODUCTS_TYPE } from '@/constants';
import * as Yup from 'yup';

export const productsValidationSchema: any = Yup?.object()?.shape({
  chooseProduct: Yup?.object()?.when('productType', ([pro]: any, field: any) =>
    pro === PRODUCTS_TYPE?.EXT_PRODUCT
      ? field?.required('Field is required')
      : field?.optional(),
  ),
  name: Yup?.string()?.when('productType', ([pro]: any, field: any) =>
    pro === PRODUCTS_TYPE?.NEW_PRODUCT
      ? field?.required('Field is required')
      : field?.optional(),
  ),
  purchasePrice: Yup?.number()
    ?.transform((value, originalValue) => (originalValue === '' ? null : value))
    ?.nullable()
    ?.positive('Purchase price must be a positive number')
    ?.when('productType', ([pro]: any, field: any) =>
      pro === PRODUCTS_TYPE?.NEW_PRODUCT
        ? field?.required('Field is required')
        : field?.optional(),
    ),
  unitPrice: Yup?.number()
    ?.transform((value, originalValue) => (originalValue === '' ? null : value))
    ?.nullable()
    ?.positive('unit price must be a positive number')
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
});

export const productDefaultValues = {
  productType: 'new-products',
  name: '',
  purchasePrice: null,
  unitPrice: null,
  sku: '',
  category: null,
  description: '',
  isActive: false,
  file: '',
};

export const addContactFields = (productCatagories: any) => {
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
        name: 'category',
        label: 'Category',
        placeholder: 'Select Category',
        required: true,
        apiQuery: productCatagories,
        getOptionLabel: (option: any) => option?.name,
      },
      component: RHFAutocompleteAsync,
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
