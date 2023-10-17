import * as yup from 'yup';
import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

export const dropdownDummy = [
  {
    value: 'option1',
    label: 'Option 1',
  },
  {
    value: 'option2',
    label: 'Option 2',
  },
];

export const dropdownDummy2 = [
  {
    value: 122,
    label: 'Option 1',
  },
  {
    value: 22,
    label: 'Option 2',
  },
];

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
export const validationSchema: any = yup.object().shape({
  orderName: yup.string().required('Required field!'),
  orderNumber: yup
    .number()
    .typeError('Enter valid date format!')
    .required('Required field!'),
  vendor: yup.string().required('Required field!'),
  currency: yup
    .string()
    .typeError('Enter valid date format!')
    .required('Required field!'),
  department: yup.string(),
  deliverDate: yup
    .date()
    .typeError('Enter valid date format!')
    .required('Required field!'),
  location: yup.string(),
  termsAndCondidtions: yup.string(),
});

export const defaultValues = {
  orderName: '',
  orderNumber: '',
  vendor: '',
  currency: '',
  department: '',
  deliverDate: null,
  location: '',
  termsAndCondidtions: '',
};

export const newPurchaseFields = [
  {
    id: 2,
    component: RHFTextField,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'orderName',
      label: 'order Name',
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
      label: 'order Number',
      required: true,
      type: 'number',
    },
  },
  {
    id: 2,
    component: RHFSelect,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'vendor',
      label: 'vendor',
      select: true,
      options: ticketsTypeOptions,
      required: true,
    },
  },
  {
    id: 2,
    component: RHFSelect,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'currency',
      label: 'currency',
      select: true,
      options: ticketsTypeOptions,
      required: true,
    },
  },
  {
    id: 920,
    componentProps: {
      fullWidth: true,
      name: 'department',
      label: 'department',
      select: true,
      options: dropdownDummy,
    },
    gridLength: 6,
    component: RHFSelect,
  },
  {
    id: 200,
    component: RHFDatePicker,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'deliverDate',
      label: 'expected Deliver Date',
      select: true,
      options: dropdownDummy,
    },
  },
  {
    id: 129,
    componentProps: {
      fullWidth: true,
      name: 'location',
      label: 'location',
      select: true,
      options: dropdownDummy,
    },
    gridLength: 6,
    component: RHFSelect,
  },
  {
    id: 129,
    componentProps: {
      fullWidth: true,
      name: 'termsAndCondidtions',
      label: 'terms And Condidtions',
      multiline: true,
      minRows: 3,
    },
    gridLength: 12,
    component: RHFTextField,
  },
];

export const data: any = [
  {
    id: 1,
    itemName: 'PO-1',
    decription: 'Dell Laptop',
    costPerItem: 'Dell',
    quantity: '30 Mar, 2023',
    taxRate: 'Received',
    total: '1200',
  },
  {
    id: 2,
    itemName: 'PO-1',
    decription: 'Dell Laptop',
    costPerItem: 'Dell',
    quantity: '30 Mar, 2023',
    taxRate: 'Received',
    total: '1200',
  },
];

export const columns = (): any => [
  {
    accessorFn: (row: any) => row.itemName,
    id: 'Order Number',
    header: <span>Order Number</span>,
    cell: (info: any) => <span>{info.getValue()}</span>,
  },
  {
    accessorFn: (row: any) => row.decription,
    id: 'Order Name',
    header: <span>Order Name</span>,
    cell: (info: any) => <span>{info.getValue()}</span>,
  },
  {
    accessorFn: (row: any) => row.costPerItem,
    id: 'Vendor',
    header: <span>Vendor</span>,
    cell: (info: any) => <span>{info.getValue()}</span>,
  },
  {
    accessorFn: (row: any) => row.quantity,
    id: 'Expected Delivery Date',
    header: <span>Expected Delivery Date</span>,
    cell: (info: any) => <span>{info.getValue()}</span>,
  },
  {
    accessorFn: (row: any) => row.taxRate,
    id: 'Status',
    header: <span>Status</span>,
    cell: (info: any) => <span>{info.getValue()}</span>,
  },
  {
    accessorFn: (row: any) => row.total,
    id: 'Total Cost (£)',
    header: <span>Total Cost (£)</span>,
    cell: (info: any) => <span>{info.getValue()}</span>,
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

export const itemsNameList = [
  {
    title: 'dsfs',
  },
];

export const singleItem = {
  itemName: '',
  description: '',
  costPerItem: null,
  quantity: null,
  taxRate: null,
  total: null,
};

export const itemsDetailsData = [
  {
    itemName: 'Dell ',
    description: ' dell product',
    costPerItem: 200,
    quantity: 12,
    taxRate: 17,
    total: 2400,
  },
  {
    itemName: 'Dell 2',
    description: ' dell product',
    costPerItem: 200,
    quantity: 12,
    taxRate: 17,
    total: 2400,
  },
  {
    itemName: 'Dell 3',
    description: ' dell product',
    costPerItem: 200,
    quantity: 12,
    taxRate: 17,
    total: 2400,
  },
  {
    itemName: 'Dell 4',
    description: ' dell product',
    costPerItem: 200,
    quantity: 12,
    taxRate: 17,
    total: 2400,
  },
  {
    itemName: 'Dell 5',
    description: ' dell product',
    costPerItem: 200,
    quantity: 12,
    taxRate: 17,
    total: 2400,
  },
];

export const billingData = [
  { label: 'subTotal ($)', value: 144.0 },
  { label: 'discount (%)', value: 0 },
  { label: 'Tax rate (%)', value: 0 },
  { label: 'shipping ($)', value: 0 },
  { label: 'total ($)', value: 0 },
];
