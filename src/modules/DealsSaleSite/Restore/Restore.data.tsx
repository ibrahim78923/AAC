import { Checkbox } from '@mui/material';

export const RestoreTableColumns: any = [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.dealName,
    id: 'dealName',
    isSortable: true,
    header: 'Deal Name',
    cell: (info: any) => info.getValue(),
  },

  {
    accessorFn: (row: any) => row.deletedBy,
    id: 'deletedby',
    isSortable: true,
    header: 'Deleted By',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.timeDeleted,
    id: 'timeDeleted',
    isSortable: true,
    header: 'Time Deleted',
    cell: (info: any) => info.getValue(),
  },
];

export const RestoreTableData = [
  {
    id: '1',
    dealName: 'test Deal 01',
    deletedBy: 'Emma Williams',
    timeDeleted: 'Friday, March,2023-09-17',
  },
  {
    id: '2',
    dealName: 'test Deal 02',
    deletedBy: 'Emma Williams',
    timeDeleted: 'Friday, March,2023-09-17',
  },
  {
    id: '3',
    dealName: 'test Deal 03',
    deletedBy: 'Emma Williams',
    timeDeleted: 'Friday, March,2023-09-17',
  },
  {
    id: '4',
    dealName: 'test Deal 04',
    deletedBy: 'Emma Williams',
    timeDeleted: 'Friday, March,2023-09-17',
  },
];
