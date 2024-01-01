import { Box, Typography } from '@mui/material';

import { SwitchBtn } from '@/components/SwitchButton';

import { LogoIcon } from '@/assets/icons';

export const companyColumns: any = [
  {
    accessorFn: (row: any) => row?.Product,
    id: 'product',
    isSortable: true,
    header: 'Product',
    cell: (info: any) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LogoIcon />
        <Typography sx={{ fontSize: '12px' }}>
          {info?.row?.original?.product?.name}
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.Company,
    id: 'company',
    isSortable: true,
    header: 'Company',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.manageRole,
    id: 'manageRole',
    isSortable: true,
    header: 'Manage Roles',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.Status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => (
      <SwitchBtn
        checked={info?.row?.original?.status === 'ACTIVE' ? true : false}
      />
    ),
  },
];
