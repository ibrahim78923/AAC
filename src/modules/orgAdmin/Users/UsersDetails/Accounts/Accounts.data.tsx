import { Box, Checkbox, Typography } from '@mui/material';

import { SwitchBtn } from '@/components/SwitchButton';

import { LogoIcon } from '@/assets/icons';

export const companyData: any = [
  {
    Id: 1,
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
  },
  {
    Id: 2,
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
  },
  {
    Id: 3,
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
  },
  {
    Id: 4,
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
  },
  {
    Id: 5,
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
  },
  {
    Id: 6,
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user',
  },
];

export const companyColumns: any = [
  {
    accessorFn: (row: any) => row?.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.Product,
    id: 'product',
    isSortable: false,
    header: 'Product',
    cell: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LogoIcon />
        <Typography sx={{ fontSize: '12px' }}>Air Sales</Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.Company,
    id: 'company',
    isSortable: true,
    header: 'Company',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.Email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.ManageRole,
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
    cell: <SwitchBtn defaultChecked />,
  },
];
