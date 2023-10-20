import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { Typography } from '@mui/material';
export const validationSchema = Yup.object().shape({
  orderName: Yup.string().required('Field is Required'),
  orderNumber: Yup.string().required('Field is Required'),
  vendor: Yup.string(),
  currency: Yup.string().required('Field is Required'),
  department: Yup.string(),
  expectedDeliveryDate: Yup.date(),
  location: Yup.string(),
  termAndCondition: Yup.string(),
});
export const defaultValues = {
  orderName: '',
  orderNumber: '',
  vendor: '',
  currency: '',
  department: '',
  expectedDeliveryDate: new Date(),
  location: '',
  termAndCondition: '',
};
export const purchaseOrderActionArray = [
  {
    componentProps: {
      name: 'orderName',
      label: 'Order Name',
      fullWidth: true,
      select: false,
      required: true,
    },
    component: RHFTextField,
    md: 4.5,
  },
  {
    componentProps: {
      name: 'orderNumber',
      label: 'Order Number',
      fullWidth: true,
      select: false,
      required: true,
    },
    component: RHFTextField,
    md: 4.5,
  },
  {
    componentProps: {
      name: 'vendor',
      label: 'Vendor',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'microsoft',
        label: 'Microsoft',
      },
      {
        value: 'dell',
        label: 'Dell',
      },
      {
        value: 'apple',
        label: 'Apple',
      },
      {
        value: 'huawie',
        label: 'Huawie',
      },
      {
        value: 'hp',
        label: 'Hp',
      },
    ],

    component: RHFSelect,
    md: 4.5,
  },
  {
    componentProps: {
      name: 'currency',
      label: 'Currency',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      {
        value: 'pound',
        label: 'Pound',
      },
      {
        value: 'dollars',
        label: 'Dollars',
      },
    ],

    component: RHFSelect,
    md: 4.5,
  },
  {
    componentProps: {
      name: 'department',
      label: 'Department',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'it',
        label: 'IT',
      },
      {
        value: 'operation',
        label: 'Operation',
      },
      {
        value: 'sale',
        label: 'Sale',
      },
    ],

    component: RHFSelect,
    md: 4.5,
  },
  {
    componentProps: {
      name: 'expectedDeliveryDate',
      label: 'Expected delivery Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 4.5,
  },
  {
    componentProps: {
      name: 'location',
      label: 'location ',
      fullWidth: true,
      select: true,
    },

    options: [
      {
        value: 'afganistan',
        label: 'Afganistan',
      },
      {
        value: 'alandIslands',
        label: 'Aland Islands',
      },
      {
        value: 'albania',
        label: 'Albania',
      },
      {
        value: 'american Samoa',
        label: 'American Samoa',
      },
      {
        value: 'andorra',
        label: 'Andorra',
      },
      {
        value: 'andorra',
        label: 'Andorra',
      },
    ],

    component: RHFSelect,
    md: 4.5,
  },
  {
    componentProps: {
      name: 'termAndCondition',
      label: 'Term And Condition',
      fullWidth: true,
      select: false,
      required: true,
      rows: 3,
      multiline: true,
    },
    component: RHFTextField,
    md: 9,
  },
  ,
  {
    componentProps: {
      variant: 'h5',
    },
    heading: 'Item Details',
    gridLength: 12,
    component: Typography,
  },

  {
    componentProps: {
      variant: 'h5',
    },

    gridLength: 12,
    component: Typography,
  },
];
