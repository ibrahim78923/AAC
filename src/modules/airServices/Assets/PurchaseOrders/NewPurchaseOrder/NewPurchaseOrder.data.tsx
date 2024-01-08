import * as yup from 'yup';
import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';

export const dropdownDummy = ['Option 1', 'Option 2'];

export const currencyOptions = ['Pound', 'Dollars'];

// form validation schema
export const validationSchema: any = yup?.object()?.shape({
  orderName: yup?.string()?.required('Required'),
  orderNumber: yup
    ?.number()
    ?.typeError('Must be a Number')
    ?.required('Required'),
  vendor: yup?.string()?.required('Required'),
  currency: yup?.string()?.required('Required'),
  department: yup?.string(),
  deliverDate: yup?.date()?.required('Required'),
  location: yup?.string(),
  termsAndConditions: yup?.string(),
});

export const defaultValues = {
  orderName: '',
  orderNumber: 0,
  vendor: null,
  currency: '',
  department: null,
  deliverDate: null,
  location: null,
  termsAndConditions: '',
  purchaseDetails: [
    {
      itemName: null,
      description: '',
      quantity: 0,
      costPerItem: 0,
      taxRate: 0,
      total: 0,
    },
  ],
};

export const newPurchaseFieldsFunction = (
  departmentApiQuery: any,
  locationApiQuery: any,
  vendorApiQuery: any,
  handleVenderSelect?: (e: string) => void,
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
      onChange: handleVenderSelect,
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
      name: 'deliverDate',
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
      name: 'termsAndConditions',
      label: 'Terms and Conditions',
      multiline: true,
      minRows: 3,
      placeholder: 'Enter Description',
    },
    gridLength: 12,
    component: RHFTextField,
  },
];

export const data: any = [
  {
    id: 1,
    itemName: 'PO-1',
    description: 'Dell Laptop',
    costPerItem: 'Dell',
    quantity: '30 Mar, 2023',
    taxRate: 'Received',
    total: '1200',
  },
  {
    id: 2,
    itemName: 'PO-1',
    description: 'Dell Laptop',
    costPerItem: 'Dell',
    quantity: '30 Mar, 2023',
    taxRate: 'Received',
    total: '1200',
  },
];

export const columns = (): any => [
  {
    accessorFn: (row: any) => row?.itemName,
    id: 'OrderNumber',
    header: 'Order Number',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.description,
    id: 'description',
    header: 'Order Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.costPerItem,
    id: 'Vendor',
    header: 'Vendor',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.quantity,
    id: 'quantity',
    header: 'Expected Delivery Date',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.taxRate,
    id: 'taxRate',
    header: 'Status',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.total,
    id: 'Total Cost (£)',
    header: 'Total Cost (£)',
    cell: (info: any) => {
      info?.getValue();
    },
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
