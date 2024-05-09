import {
  RHFDropZone,
  RHFEditor,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const ProductValidationSchema = Yup.object().shape({
  name: Yup.string().required('Field is Required'),
  purchasePrice: Yup?.string().required('Field is Required'),
  unitPrice: Yup?.string().required('Field is Required'),
});

export const initValues = {
  name: '',
  purchasePrice: '',
  unitPrice: '',
  sku: '',
  category: '',
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
        required: true,
      },
      options: productCatagories?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
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
        name: 'image',
        label: 'Upload',
        fullWidth: true,
      },
      component: RHFDropZone,
      md: 12,
    },
  ];
};
