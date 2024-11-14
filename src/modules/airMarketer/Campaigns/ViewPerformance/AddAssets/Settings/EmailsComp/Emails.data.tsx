import { Checkbox } from '@mui/material';

export const EmailsData: any = [
  {
    Id: 1,
    Emails: `Emails@yopmail.com`,
  },
  {
    Id: 2,
    Emails: `Emails@yopmail.com`,
  },
];

export const EmailsColumns: any = [
  {
    accessorFn: (row: any) => row?.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.Emails,
    id: 'emails',
    cell: (info: any) => info?.getValue(),
    header: 'Emails',
    isSortable: false,
  },
];
