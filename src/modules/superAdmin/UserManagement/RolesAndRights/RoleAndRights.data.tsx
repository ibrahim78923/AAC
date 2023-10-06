import { Checkbox } from '@mui/material';
import { Switch } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const data: any = [
  {
    Id: 1,
    RoleId: `123`,
    RoleName: 'Company Owner',
    Products: 'Sales',
    Status: <Switch {...label} defaultChecked />,
    CreatedOn: '12/10/2023',
  },
  {
    Id: 2,
    RoleId: `456`,
    RoleName: 'Company Owner',
    Products: 'Services',
    Status: <Switch {...label} defaultChecked />,
    CreatedOn: '12/10/2023',
  },
  {
    Id: 3,
    RoleId: `789`,
    RoleName: 'Admin',
    Products: 'Marketing',
    Status: <Switch {...label} defaultChecked />,
    CreatedOn: '12/10/2023',
  },
  {
    Id: 4,
    RoleId: `752`,
    RoleName: 'Admin',
    Products: 'Loyalty Program',
    Status: <Switch {...label} defaultChecked />,
    CreatedOn: '12/10/2023',
  },
];

export const columns: any = [
  {
    accessorFn: (row: any) => row.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.RoleId,
    id: 'roleId',
    cell: (info: any) => info.getValue(),
    header: 'Role ID',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.RoleName,
    id: 'roleName',
    isSortable: true,
    header: 'Role Name',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Products,
    id: 'products',
    isSortable: true,
    header: 'Products',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.CreatedOn,
    id: 'createdOn',
    isSortable: true,
    header: 'CreatedOn',
    cell: (info: any) => info.getValue(),
  },
];
