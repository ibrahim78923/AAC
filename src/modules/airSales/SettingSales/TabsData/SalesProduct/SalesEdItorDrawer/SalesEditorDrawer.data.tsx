import {
  RHFAutocompleteAsync,
  RHFDropZone,
  RHFEditor,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import { useLazyGetProductCategoriesQuery } from '@/services/common-APIs';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';

import * as Yup from 'yup';

export const salesProductvalidationSchema = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);
  return Yup?.object()?.shape({
    purchasePrice: Yup?.number()
      ?.transform((value, originalValue) =>
        originalValue === '' ? undefined : value,
      )
      ?.positive('Purchase price must be a positive number')
      ?.required('Field is Required'),
    unitPrice: Yup?.number()
      ?.transform((value, originalValue) =>
        originalValue === '' ? undefined : value,
      )
      ?.positive('Unit price must be a positive number')
      ?.required('Field is Required'),
    name: Yup?.string()?.required('Field is Required'),
    category: Yup?.object()?.required('Field is Required'),
    description: Yup?.string(),
    ...formSchema,
  });
};

export const salesProductDefaultValues = (data?: any, form?: any) => {
  const initialValues: any = dynamicFormInitialValue(data, form);
  return {
    name: data?.name ?? '',
    sku: data?.sku ?? '',
    purchasePrice: data?.purchasePrice ?? '',
    category: data?.category ?? null,
    associate: data?.associateDetails ?? null,
    description: data?.description ?? '',
    isActive: data?.isActive ?? false,
    unitPrice: data?.unitPrice ?? '',
    image: null,
    ...initialValues,
  };
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
        label: 'Purchase Price  (£) ',
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
        required: true,
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
