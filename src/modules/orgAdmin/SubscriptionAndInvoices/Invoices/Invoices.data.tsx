import { Box, Checkbox } from '@mui/material';
import { styles } from './Invoices.style';

export const columns: any = [
  {
    accessorFn: (row: any) => row.id,
    id: 'cellCheckbox',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="cellCheckbox" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.product,
    id: 'products',
    cell: (info: any) => (
      <>
        <Box sx={{ fontWeight: '500', color: 'blue.dull_blue' }}>
          {info.getValue()}
        </Box>
        <Box>{info.row.original.plan}</Box>
      </>
    ),
    header: 'Products',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.dateIssued,
    id: 'dateIssued',
    isSortable: true,
    header: 'Date Issued',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.invoiceNumber,
    id: 'invoiceNumber',
    isSortable: true,
    header: 'Details',
    cell: (info: any) => (
      <>
        <Box>Invoice # {info.getValue()}</Box>
        <Box>Due date: {info.row.original.dueDate}</Box>
      </>
    ),
  },
  {
    accessorFn: (row: any) => row.invoiceAmount,
    id: 'invoiceAmount',
    isSortable: true,
    header: 'Invoice amount',
    cell: (info: any) => <>£ {info.getValue()}</>,
  },
  {
    accessorFn: (row: any) => row.invoiceBalance,
    id: 'invoiceBalance',
    isSortable: true,
    header: 'Invoice balance',
    cell: (info: any) => <>£ {info.getValue()}</>,
  },
  {
    accessorFn: (row: any) => row.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => <Box sx={styles.chip}>{info.getValue()}</Box>,
  },
];
