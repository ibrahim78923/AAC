import {
  RHFTextField,
  RHFSelect,
  // RHFRadioGroup,
  RHFCheckbox,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required'),
  unitPrice: Yup?.number()?.required('Field is Required'),
  purchasePrice: Yup?.number()?.required('Field is Required'),
  isActive: Yup?.boolean()?.required('Field is Required'),
});

export const initValues = {
  // image:'',
  name: '',
  sku: '',
  category: '',
  description: '',
  isActive: true,
  unitPrice: 0,
  purchasePrice: 0,
};

export const addContactFields = (productCatagories: any) => [
  // {
  //   id: 'image',
  //   component: RHFTextField,
  //   componentProps: {
  //     name: 'image',
  //     label: 'image',
  //     placeholder: 'Enter here',
  //     // required: 'true',
  //   },
  // },
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
    id: 'sku',
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
    options: productCatagories?.map((item: any) => ({
      value: item?._id,
      label: item?.name,
    })),
  },
  {
    id: 'description',
    component: RHFTextField,
    componentProps: {
      name: 'description',
      // label: 'Description',
    },
  },
  {
    id: 'isActive',
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
    id: 'purchasePrice',
    component: RHFTextField,
    componentProps: {
      name: 'purchasePrice',
      label: 'Created Date',
      placeholder: '01/01/2022',
    },
  },
];
