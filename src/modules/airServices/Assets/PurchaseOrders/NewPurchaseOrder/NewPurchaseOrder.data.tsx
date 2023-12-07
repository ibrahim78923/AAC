import * as yup from 'yup';
import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

export const dropdownDummy = ['Option 1', 'Option 2'];

export const currencyOptions = ['Pound', 'Dollars'];

const ticketsTypeOptions = [
  {
    value: 'search',
    label: 'Search',
  },
  {
    value: 'All Tickets',
    label: 'All Tickets',
  },
  {
    value: 'Urgent and High Priority',
    label: 'Urgent and High Priority',
  },
  {
    value: 'My Open and Pending Tickets',
    label: 'My Open and Pending Tickets',
  },
  {
    value: 'Spam',
    label: 'Spam',
  },
  {
    value: 'New & My Open Tickets',
    label: 'New & My Open Tickets',
  },
  {
    value: 'All Unresolved Tickets',
    label: 'All Unresolved Tickets',
  },
  {
    value: 'Incidents',
    label: 'Incidents',
  },
  {
    value: 'Service Requests',
    label: 'Service Requests',
  },
  {
    value: 'Tickets I Requested',
    label: 'Tickets I Requested',
  },
  {
    value: 'Shared with me',
    label: 'Shared with me',
  },
];

// form validation schema
export const validationSchema: any = yup?.object()?.shape({
  orderName: yup?.string()?.required('Required'),
  orderNumber: yup?.number()?.required('Required'),
  vendor: yup?.string()?.required('Required'),
  currency: yup?.string()?.required('Required'),
  department: yup?.string(),
  deliverDate: yup?.date()?.required('Required'),
  location: yup?.string(),
  termsAndConditions: yup?.string(),
});

export const defaultValues = {
  orderName: '',
  orderNumber: '',
  vendor: '',
  currency: '',
  department: '',
  deliverDate: null,
  location: '',
  termsAndConditions: '',
};

export const newPurchaseFieldsFunction = (
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
    component: RHFSelect,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'vendor',
      label: 'Vendor',
      select: true,
      options: ticketsTypeOptions,
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
      select: true,
      options: dropdownDummy,
      placeholder: 'Select Department',
    },
    gridLength: 6,
    component: RHFAutocomplete,
  },
  {
    id: 6,
    component: RHFDatePicker,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
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
      select: true,
      options: dropdownDummy,
      placeholder: 'Select Location',
    },
    gridLength: 6,
    component: RHFAutocomplete,
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
