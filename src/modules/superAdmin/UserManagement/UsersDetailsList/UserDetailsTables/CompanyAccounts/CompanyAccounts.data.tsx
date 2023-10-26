import { Box, Checkbox, Typography } from '@mui/material';

import { SwitchBtn } from '../../../SwitchButton';

import { LogoIcon } from '@/assets/icons';

export const companyData: any = [
  {
    Id: 1,
    Product: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LogoIcon />
        <Typography sx={{ fontSize: '12px' }}>Air Sales</Typography>
      </Box>
    ),
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
    Status: <SwitchBtn defaultChecked />,
  },
  {
    Id: 2,
    Product: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LogoIcon />
        <Typography sx={{ fontSize: '12px' }}>Air Sales</Typography>
      </Box>
    ),
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
    Status: <SwitchBtn defaultChecked />,
  },
  {
    Id: 3,
    Product: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LogoIcon />
        <Typography sx={{ fontSize: '12px' }}>Air Sales</Typography>
      </Box>
    ),
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
    Status: <SwitchBtn defaultChecked />,
  },
  {
    Id: 4,
    Product: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LogoIcon />
        <Typography sx={{ fontSize: '12px' }}>Air Sales</Typography>
      </Box>
    ),
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
    Status: <SwitchBtn defaultChecked />,
  },
  {
    Id: 5,
    Product: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LogoIcon />
        <Typography sx={{ fontSize: '12px' }}>Air Sales</Typography>
      </Box>
    ),
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
    Status: <SwitchBtn defaultChecked />,
  },
  {
    Id: 6,
    Product: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LogoIcon />
        <Typography sx={{ fontSize: '12px' }}>Air Sales</Typography>
      </Box>
    ),
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user',
    Status: <SwitchBtn defaultChecked />,
  },
];

export const companyColumns: any = [
  {
    accessorFn: (row: any) => row.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.Product,
    id: 'product',
    cell: (info: any) => info.getValue(),
    header: 'Product',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.Company,
    id: 'company',
    isSortable: true,
    header: 'Company',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.ManageRole,
    id: 'manageRole',
    isSortable: true,
    header: 'Manage Roles',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => info.getValue(),
  },
];
