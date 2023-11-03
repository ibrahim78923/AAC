import { Box, Checkbox } from '@mui/material';
import { styles } from './Invoices.style';
import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const columns = (
  setIsGetRowValues: any,
  setIschecked: any,
  ischecked: any,
  isGetRowValues: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          checked={
            info?.cell?.row?.original?.id ===
              isGetRowValues?.cell?.row?.original?.id && ischecked
          }
          name={info?.getValue()}
          onClick={() => {
            setIsGetRowValues(info), setIschecked(!ischecked);
          }}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.product,
      id: 'products',
      cell: (info: any) => (
        <>
          <Box sx={{ fontWeight: '500', color: 'blue.dull_blue' }}>
            {info?.getValue()}
          </Box>
          <Box>{info?.row?.original?.plan}</Box>
        </>
      ),
      header: 'Products',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.dateIssued,
      id: 'dateIssued',
      isSortable: true,
      header: 'Date Issued',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.invoiceNumber,
      id: 'invoiceNumber',
      isSortable: true,
      header: 'Details',
      cell: (info: any) => (
        <>
          <Box>Invoice # {info?.getValue()}</Box>
          <Box>Due date: {info?.row?.original?.dueDate}</Box>
        </>
      ),
    },
    {
      accessorFn: (row: any) => row?.invoiceAmount,
      id: 'invoiceAmount',
      isSortable: true,
      header: 'Invoice amount',
      cell: (info: any) => <>£ {info?.getValue()}</>,
    },
    {
      accessorFn: (row: any) => row?.invoiceBalance,
      id: 'invoiceBalance',
      isSortable: true,
      header: 'Invoice balance',
      cell: (info: any) => <>£ {info?.getValue()}</>,
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => <Box sx={styles?.chip}>{info?.getValue()}</Box>,
    },
  ];
};

export const FilterInvoiceValidationSchema = Yup?.object()?.shape({
  products: Yup?.string()?.trim()?.required('Field is Required'),
  plan: Yup?.string()?.trim()?.required('Field is Required'),
  status: Yup?.string()?.trim()?.required('Field is Required'),
  InvoiceDate: Yup?.string()?.trim()?.required('Field is Required'),
  PaymentDate: Yup?.string()?.trim()?.required('Field is Required'),
});

export const FilterInvoiceDefaultValues = {
  products: '',
  plan: '',
  status: '',
  InvoiceDate: '',
  PaymentDate: '',
};

export const FilterInvoiceFiltersDataArray = [
  {
    componentProps: {
      name: 'products',
      label: 'Products',
      select: true,
    },
    options: [
      { value: 'Sales', label: 'Sales' },
      { value: 'Marketing', label: 'Marketing' },
      { value: 'Service', label: 'Service' },
      { value: 'Operations', label: 'Operations' },
      { value: 'Loyalty Program', label: 'Loyalty Program' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'plan',
      label: 'Plan type',
      select: true,
    },
    options: [
      { value: 'John Doe', label: 'John Doe' },
      { value: 'William', label: 'William' },
      { value: 'Andrew', label: 'Andrew' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'status',
      label: 'status',
      select: true,
    },
    options: [
      { value: 'John Doe', label: 'John Doe' },
      { value: 'William', label: 'William' },
      { value: 'Andrew', label: 'Andrew' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'InvoiceDate',
      label: 'Invoice Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'PaymentDate',
      label: 'Payment Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
];
