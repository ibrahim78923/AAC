import { Checkbox } from '@mui/material';

export const groupsData: any = [
  {
    Id: 1,
    GroupName: 'Employees(15)',
  },
  {
    Id: 2,
    GroupName: 'Onboard(45)',
  },
  {
    Id: 3,
    GroupName: 'New User(23)',
  },
  {
    Id: 4,
    GroupName: 'University(61)',
  },
  {
    Id: 5,
    GroupName: 'Sale(313)',
  },
  {
    Id: 6,
    GroupName: 'Lead(64)',
  },
];

export const groupsColumns: any = [
  {
    accessorFn: (row: any) => row?.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.GroupName,
    id: 'groupName',
    isSortable: false,
    header: 'Group Name',
    cell: (info: any) => info?.getValue(),
  },
];
