import { Checkbox } from '@mui/material';

export const dealsColumns: any = [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
    header: <Checkbox color="primary" name="id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.dealOwner,
    id: 'dealOwner',
    header: 'Deal Owner',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.dealName,
    id: 'dealName',
    isSortable: true,
    header: 'Deal Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.closeDate,
    id: 'closeDate',
    isSortable: true,
    header: 'Close Date',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.amount,
    id: 'amount',
    isSortable: true,
    header: 'Amount',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.dealStage,
    id: 'dealStage',
    isSortable: true,
    header: 'Deal Stage',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.dealPipeline,
    id: 'dealPipeline',
    isSortable: true,
    header: 'Deal Pipeline',
    cell: (info: any) => info?.getValue(),
  },
];
