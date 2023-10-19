import * as yup from 'yup';
import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';

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

export const editInventoryFields = [
  {
    id: 1,
    component: RHFTextField,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'displayName',
      label: 'display Name',
      required: true,
    },
  },
  {
    id: 2,
    component: RHFTextField,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'assetTag',
      label: 'asset Tag',
    },
  },
  {
    id: 3,
    component: RHFSelect,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'assetType',
      label: 'asset Type',
      select: true,
      options: ticketsTypeOptions,
      required: true,
    },
  },
  {
    id: 4,
    component: RHFSelect,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'impact',
      label: 'impact',
      select: true,
      options: ticketsTypeOptions,
      required: true,
    },
  },
  {
    id: 5,
    componentProps: {
      fullWidth: true,
      name: 'department',
      label: 'department',
      select: true,
      options: dropdownDummy,
    },
    gridLength: 12,
    component: RHFEditor,
  },
  {
    id: 6,
    component: RHFDatePicker,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'assetLifeExpireOn',
      label: 'asset Life Expire On',
      select: true,
      options: dropdownDummy,
    },
  },
  {
    id: 7,
    componentProps: {
      varient: 'h4',
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: '1.875rem',
    },
    heading: 'Services Properties',
    gridLength: 12,
    component: Typography,
  },
  {
    id: 7,
    componentProps: {
      fullWidth: true,
      name: 'services',
      label: 'services',
      select: true,
      options: dropdownDummy,
    },
    gridLength: 6,
    component: RHFSelect,
  },
  {
    id: 17,
    componentProps: {
      varient: 'h4',
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: '1.875rem',
    },
    heading: 'Assignment',
    gridLength: 12,
    component: Typography,
  },
  {
    id: 7,
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
    id: 7,
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
    id: 6,
    component: RHFDatePicker,
    gridLength: 3,
    componentProps: {
      fullWidth: true,
      name: 'assignedOnDate',
      label: 'assignedOn',
      select: true,
      options: dropdownDummy,
    },
  },
  {
    id: 6,
    component: RHFTimePicker,
    gridLength: 3,
    componentProps: {
      fullWidth: true,
      name: 'assignedOnTime',
      sx: { mt: 2.3 },
      select: true,
      options: dropdownDummy,
    },
  },
  {
    id: 7,
    componentProps: {
      fullWidth: true,
      name: 'usedBy',
      label: 'used By',
      select: true,
      options: dropdownDummy,
    },
    gridLength: 6,
    component: RHFSelect,
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
