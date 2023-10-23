import { Checkbox } from '@mui/material';

export const initColumns: any = [
  {
    accessorFn: (row: any) => row.id,
    id: 'cellCheckbox',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="cellCheckbox" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.quoteName,
    id: 'quoteName',
    cell: (info: any) => info.getValue(),
    header: 'Quote Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.quoteAmount,
    id: 'quoteAmount',
    isSortable: true,
    header: 'Quote Amount',
    cell: (info: any) => <>£20 {info.getValue()}</>,
  },
  {
    accessorFn: (row: any) => row.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.dealName,
    id: 'dealName',
    isSortable: true,
    header: 'Deal Name',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.createdBy,
    id: 'createdBy',
    isSortable: true,
    header: 'Created By',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.createdDate,
    id: 'createdDate',
    isSortable: true,
    header: 'Created Date',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.expirationDate,
    id: 'expirationDate',
    isSortable: true,
    header: 'Expiration Date',
    cell: (info: any) => info.getValue(),
  },
];
