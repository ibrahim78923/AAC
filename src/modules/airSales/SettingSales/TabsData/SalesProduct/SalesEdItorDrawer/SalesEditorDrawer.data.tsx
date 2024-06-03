import {
  RHFAutocompleteAsync,
  RHFDropZone,
  RHFEditor,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import { useLazyGetProductCategoriesQuery } from '@/services/common-APIs';

import * as Yup from 'yup';

export const salesProductvalidationSchema = Yup?.object()?.shape({
  purchasePrice: Yup?.number()?.positive()?.required('Field is Required'),
  unitPrice: Yup?.number()?.positive()?.required('Field is Required'),
  name: Yup?.string()?.required('Field is Required'),
  description: Yup?.string(),
});

export const salesProductDefaultValues: any = {
  name: '',
  sku: '',
  purchasePrice: null,
  category: null,
  associate: '',
  description: '',
  isActive: false,
  unitPrice: null,
  image: '',
};

export const dataArray = () => {
  const productCategories = useLazyGetProductCategoriesQuery();
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
