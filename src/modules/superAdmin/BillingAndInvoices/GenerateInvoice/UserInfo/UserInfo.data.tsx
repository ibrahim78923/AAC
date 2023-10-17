import { Box } from '@mui/material';

export const columns: any = [
  {
    accessorFn: (row: any) => row.id,
    id: 'srNumber',
    cell: () => '1',
    header: 'Sr#',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.product,
    id: 'product',
    cell: (info: any) => (
      <>
        <Box sx={{ fontWeight: '500', color: 'blue.dull_blue' }}>
          {info.getValue()}
        </Box>
        <Box>{info.row.original.plan}</Box>
      </>
    ),
    header: 'Product/Suite',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.planPrice,
    id: 'planPrice',
    isSortable: true,
    header: 'Plan Price',
    cell: (info: any) => <>£ {info.getValue()}</>,
  },
  {
    accessorFn: (row: any) => row.additionalUsers,
    id: 'additionalUsers',
    isSortable: true,
    header: 'Additional Users',
    cell: (info: any) => (
      <>
        {info.getValue()} (*£15) = £{info.getValue() * 15}
      </>
    ),
  },
  {
    accessorFn: (row: any) => row.additionalStorage,
    id: 'additionalStorage',
    isSortable: true,
    header: 'Additional Storage',
    cell: (info: any) => (
      <>
        {info.getValue()} (*£15) = £{info.getValue() * 15}
      </>
    ),
  },
  {
    accessorFn: (row: any) => row.discount,
    id: 'discount',
    isSortable: true,
    header: 'Discount(%)',
    cell: (info: any) => (
      <Box sx={{ fontWeight: '800' }}>{info.getValue()} %</Box>
    ),
  },
  {
    accessorFn: (row: any) => row.subTotal,
    id: 'subTotal',
    isSortable: true,
    header: 'Subtotal',
    cell: (info: any) => (
      <Box sx={{ fontWeight: '800' }}>£ {info.getValue()}</Box>
    ),
  },
];
