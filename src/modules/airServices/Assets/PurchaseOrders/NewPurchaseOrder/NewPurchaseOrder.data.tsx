import * as yup from 'yup';
import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { Typography } from '@mui/material';
import { PURCHASE_ORDER_STATUS } from '@/constants/strings';

export const currencyOptions = ['Pound', 'Dollar'];

const purchaseDetailSchema = yup?.object()?.shape({
  itemName: yup?.mixed()?.nullable()?.required('Item Name is required'),
  description: yup?.string()?.trim()?.required('Description is required'),
  quantity: yup
    ?.number()
    ?.positive('Greater than zero')
    ?.typeError('Not a number'),
  costPerItem: yup
    ?.number()
    ?.positive('Greater than zero')
    ?.typeError('Not a number'),
  taxRate: yup
    ?.number()
    ?.positive('Greater than zero')
    ?.typeError('Not a number'),
  total: yup?.number()?.positive('\u00a0')?.typeError('\u00a0'),
});

export const validationSchema: any = yup?.object()?.shape({
  orderName: yup?.string()?.required('Order Name is Required'),
  orderNumber: yup?.string()?.required('Order Number is Required'),
  vendor: yup?.mixed()?.nullable()?.required('Vendor is Required'),
  currency: yup?.mixed()?.nullable()?.required('Currency is Required'),
  department: yup?.mixed()?.nullable(),
  expectedDeliveryDate: yup
    ?.date()
    ?.nullable()
    ?.required('Delivery Date is Required'),
  location: yup?.mixed()?.nullable(),
  termAndCondition: yup?.string(),
  subTotal: yup?.number(),
  taxRatio: yup?.number(),
  shipping: yup?.number(),
  discount: yup?.number(),
  total: yup?.number(),
  purchaseDetails: yup?.array()?.of(purchaseDetailSchema),
});

export const defaultValues = (data?: any) => ({
  orderName: data?.orderName ?? '',
  orderNumber: data?.orderNumber ?? '',
  vendor: data?.vendorDetails ?? null,
  currency: data?.currency ?? null,
  department: data?.departmentDetails ?? null,
  expectedDeliveryDate: data?.expectedDeliveryDate
    ? new Date(data?.expectedDeliveryDate)
    : null,
  location: data?.locationDetails ?? null,
  termAndCondition: data?.termAndCondition ?? '',
  subTotal: data?.subTotal ?? 0,
  taxRatio: data?.taxRatio ?? 0,
  shipping: data?.shipping ?? 0,
  discount: data?.discount ?? 0,
  total: data?.total ?? 0,
  status: data?.status ?? PURCHASE_ORDER_STATUS?.OPEN,
  purchaseDetails: !!data?.purchaseDetails?.length
    ? data?.purchaseDetails?.map((item: any, index: any) => {
        const { ...rest } = item;
        delete rest?.itemName;
        return {
          itemName: data?.productDetails?.[index],
          ...rest,
        };
      })
    : [
        {
          itemName: null,
          description: '',
          quantity: '0',
          costPerItem: '0',
          taxRate: '0',
          total: '0',
        },
      ],
});

export const newPurchaseFieldsFunction = (
  departmentApiQuery: any,
  locationApiQuery: any,
  vendorApiQuery: any,
) => [
  {
    id: 10,
    componentProps: {
      color: 'slateBlue.main',
      variant: 'h5',
    },
    heading: 'Purchase Details',
    md: 12,
    component: Typography,
  },
  {
    id: 1,
    component: RHFTextField,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'orderName',
      label: 'Order Name',
      required: true,
    },
  },
  {
    id: 2,
    component: RHFTextField,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'orderNumber',
      label: 'Order Number',
      required: true,
      InputProps: {
        inputProps: {
          min: 0,
        },
      },
    },
  },
  {
    id: 3,
    component: RHFAutocompleteAsync,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'vendor',
      label: 'Vendor',
      placeholder: 'Select Vendor',
      apiQuery: vendorApiQuery,
      externalParams: {
        meta: false,
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
      },
      required: true,
    },
  },
  {
    id: 4,
    component: RHFAutocomplete,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'currency',
      label: 'Currency',
      options: currencyOptions,
      required: true,
      placeholder: 'Select Currency',
    },
  },
  {
    id: 5,
    componentProps: {
      fullWidth: true,
      name: 'department',
      label: 'Department',
      apiQuery: departmentApiQuery,
      placeholder: 'Select Department',
    },
    gridLength: 6,
    component: RHFAutocompleteAsync,
  },
  {
    id: 6,
    component: RHFDatePicker,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      required: true,
      disablePast: true,
      name: 'expectedDeliveryDate',
      label: 'Expected delivery date',
    },
  },
  {
    id: 7,
    componentProps: {
      fullWidth: true,
      name: 'location',
      label: 'Location',
      apiQuery: locationApiQuery,
      placeholder: 'Select Location',
      getOptionLabel: (option: any) => option?.locationName,
    },
    gridLength: 6,
    component: RHFAutocompleteAsync,
  },
  {
    id: 8,
    componentProps: {
      fullWidth: true,
      name: 'termAndCondition',
      label: 'Terms and Conditions',
      multiline: true,
      minRows: 3,
      placeholder: 'Enter Description',
    },
    gridLength: 12,
    component: RHFTextField,
  },
];

export const itemsDetailsList = [
  { label: 'item name', value: 'itemName' },
  { label: 'description', value: 'description' },
  { label: 'cost per item', value: 'costPerItem' },
  { label: 'quantity', value: 'quantity' },
  { label: 'tax rate(%)', value: 'taxRate' },
  { label: 'total()', value: 'total' },
];

export const itemsDetailsSubList = ['itemName', 'description', 'total'];
