import {
  RHFAutocompleteAsync,
  RHFDropZone,
  RHFEditor,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const ProductValidationSchema: any = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required'),
  purchasePrice: Yup?.string()?.required('Field is Required'),
  unitPrice: Yup?.string()?.required('Field is Required'),
  sku: Yup?.string()?.required('Field is Required'),
  category: Yup?.object()?.required('Field is Required'),
});

export const productDefaultValues = {
  name: '',
  purchasePrice: '',
  unitPrice: '',
  sku: '',
  category: null,
  description: '',
  isActive: false,
  image: '',
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
