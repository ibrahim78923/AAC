import { convertIdToShortNumber } from '@/utils';
import { Box } from '@mui/material';

export const columns: any = [
  {
    accessorFn: (row: any) => row?._id,
    id: 'planId',
    cell: (info: any) => convertIdToShortNumber(info?.getValue()),
    header: 'Plan ID',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.description,
    id: 'description',
    isSortable: true,
    header: 'Description',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.name,
    id: 'planName',
    isSortable: true,
    header: 'Plan Name',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.defaultUsers,
    id: 'defaultUsers',
    isSortable: true,
    align: 'center',
    header: 'Default Users',
    cell: (info: any) => (
      <Box sx={{ textAlign: 'center' }}>{info.getValue() ?? 'N/A'}</Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.planPrice,
    id: 'planPrice',
    isSortable: true,
    header: 'Plan Price',
    align: 'center',
    cell: (info: any) => (
      <Box sx={{ textAlign: 'center' }}>£{info?.getValue() ?? 'N/A'}</Box>
    ),
  },
];
