import { Checkbox } from '@mui/material';

export const RestoreTableColumns: any = [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
    header: <Checkbox color="primary" name="id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.dealName,
    id: 'dealName',
    isSortable: true,
    header: 'Contact',
    cell: (info: any) => info?.getValue(),
  },

  {
    accessorFn: (row: any) => row?.deletedBy,
    id: 'deletedby',
    isSortable: true,
    header: 'Deleted By',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.timeDeleted,
    id: 'timeDeleted',
    isSortable: true,
    header: 'Time Deleted',
    cell: (info: any) => info?.getValue(),
  },
];
