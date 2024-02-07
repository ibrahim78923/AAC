import * as yup from 'yup';
import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';

export const currencyOptions = ['Pound', 'Dollars'];

// form validation schema
export const validationSchema: any = yup?.object()?.shape({
  orderName: yup?.string()?.required('Required'),
  orderNumber: yup
    ?.number()
    ?.typeError('Must be a Number')
    ?.required('Required'),
  vendor: yup?.object()?.required('Required'),
  currency: yup?.string()?.required('Required'),
  department: yup?.object()?.nullable(),
  expectedDeliveryDate: yup?.date()?.required('Required'),
  location: yup?.object()?.nullable(),
  termAndCondition: yup?.string(),
});

export const defaultValues = (data?: any) => ({
  orderName: data?.orderName ?? '',
  orderNumber: data?.orderNumber ?? 0,
  vendor: data?.vendor ?? null,
  currency: data?.currency ?? '',
  department: data?.department ?? null,
  expectedDeliveryDate: new Date(data?.expectedDeliveryDate) ?? null,
  location: data?.location ?? null,
  termAndCondition: data?.termAndCondition ?? '',
  subTotal: data?.subTotal ?? 0,
  taxRatio: data?.taxRatio ?? 0,
  shipping: data?.shipping ?? 0,
  discount: data?.discount ?? 0,
  total: data?.total ?? 0,
  status: data?.status ?? 'ORDERED',
  purchaseDetails: data?.purchaseDetails ?? [
    {
      itemName: null,
      description: '',
      quantity: 0,
      costPerItem: 0,
      taxRate: 0,
      total: 0,
    },
  ],
});

export const newPurchaseFieldsFunction = (
  departmentApiQuery: any,
  locationApiQuery: any,
  vendorApiQuery: any,
) => [
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
      type: 'number',
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
      placeholder: 'Select Location',
      apiQuery: vendorApiQuery,
      externalParams: { meta: false, limit: 50 },
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
      select: true,
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
