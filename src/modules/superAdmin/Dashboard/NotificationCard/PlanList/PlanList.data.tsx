import { Box } from '@mui/material';

export const columns: any = [
  {
    accessorFn: (row: any) => row?.planId,
    id: 'planId',
    cell: (info: any) => info?.getValue(),
    header: 'Plan ID',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.description,
    id: 'description',
    isSortable: true,
    header: 'Description',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.planName,
    id: 'planName',
    isSortable: true,
    header: 'Plan Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.defaultUsers,
    id: 'defaultUsers',
    isSortable: true,
    align: 'center',
    header: 'Default Users',
    cell: (info: any) => (
      <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.planPrice,
    id: 'planPrice',
    isSortable: true,
    header: 'Plan Price',
    align: 'center',
    cell: (info: any) => (
      <Box sx={{ textAlign: 'center' }}>{info?.getValue()}</Box>
    ),
  },
];
