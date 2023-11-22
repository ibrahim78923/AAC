import { Avatar, Box, Checkbox, Typography } from '@mui/material';
import { styles } from './Invoices.style';
import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { AvatarImage } from '@/assets/images';
import { v4 as uuidv4 } from 'uuid';

export const columns = (
  setIsGetRowValues: any,
  setIsChecked: any,
  isChecked: any,
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
            info?.cell?.row?.original?._id ===
              isGetRowValues?.cell?.row?.original?._id && isChecked
          }
          name={info?.getValue()}
          onClick={() => {
            !isChecked
              ? (setIsGetRowValues(info), setIsChecked(!isChecked))
              : (setIsGetRowValues([]), setIsChecked(!isChecked));
          }}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => {
        `${row?.usersOrg?.firstName}  ${row?.usersOrg?.lastName}`;
      },
      id: 'ClientName',
      cell: (info: any) => (
        <>
          <Box sx={{ display: 'flex', gap: '5px' }}>
            <Avatar alt="Remy Sharp" src={AvatarImage?.src} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2">
                {' '}
                {`${info?.row?.original?.usersOrg?.firstName}  ${info?.row?.original?.usersOrg?.lastName}`}
              </Typography>
              <Typography variant="body3">
                {info?.row?.original?.organizations?.name}
              </Typography>
            </Box>
          </Box>
        </>
      ),
      header: 'Client Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.products,
      id: 'Products/Suite',
      isSortable: true,
      header: 'Products/Suite',
      cell: (info: any) => (
        <>
          {info?.row?.original?.plans?.products?.map((data: any) => (
            <Typography variant="subtitle2" key={uuidv4()}>
              {data?.name}{' '}
            </Typography>
          ))}
          <Typography variant="body3">
            {info?.row?.original?.details?.plantypes} plan
          </Typography>
        </>
      ),
    },
    {
      accessorFn: (row: any) => row?.billingDate?.substring(0, 10),
      id: 'InvoiceDate',
      isSortable: true,
      header: 'Invoice Date',
      cell: (info: any) => <>{info?.getValue()}</>,
    },
    {
      accessorFn: (row: any) => row?.Details,
      id: 'Details',
      isSortable: true,
      header: 'Details',
      cell: (info: any) => (
        <>
          <Box>Invoice # {info?.row?.original?.invoiceNo}</Box>
          <Box>Due date: {info?.row?.original?.dueDate?.substring(0, 10)}</Box>
        </>
      ),
    },
    {
      accessorFn: (row: any) => row?.total,
      id: 'InvoiceAmount',
      isSortable: true,
      header: 'Invoice amount',
      cell: (info: any) => <>£ {info?.getValue()}</>,
    },
    {
      accessorFn: (row: any) => row?.PaymentDate,
      id: 'PaymentDate',
      isSortable: true,
      header: 'Payment Date',
      cell: (info: any) => (
        <> {info?.row?.original?.dueDate?.substring(0, 10)}</>
      ),
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
