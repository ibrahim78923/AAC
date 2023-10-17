import { Checkbox, Switch } from '@mui/material';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const companyData: any = [
  {
    Id: 1,
    Product: `Air Sales`,
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
    Status: <Switch {...label} defaultChecked />,
  },
  {
    Id: 2,
    Product: `Air Sales`,
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
    Status: <Switch {...label} defaultChecked />,
  },
  {
    Id: 3,
    Product: `Air Sales`,
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
    Status: <Switch {...label} defaultChecked />,
  },
  {
    Id: 4,
    Product: `Air Sales`,
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
    Status: <Switch {...label} defaultChecked />,
  },
  {
    Id: 5,
    Product: `Air Sales`,
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user select here',
    Status: <Switch {...label} defaultChecked />,
  },
  {
    Id: 6,
    Product: `Air Sales`,
    Company: 'Orcalo Holding',
    Email: 'orcalo@airapple.co.uk',
    ManageRole: 'user',
    Status: <Switch {...label} defaultChecked />,
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
