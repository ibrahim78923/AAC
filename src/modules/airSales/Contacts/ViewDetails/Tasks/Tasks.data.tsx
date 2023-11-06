import { Checkbox } from '@mui/material';

export const columns: any = [
  {
    accessorFn: (row: any) => row?.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row?.taskno,
    id: 'taskno',
    cell: (info: any) => info?.getValue(),
    header: 'Task No',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row?.taskname,
    id: 'taskname',
    isSortable: true,
    header: 'Task Name',
    cell: (info: any) => info?.getValue(),
  },

  {
    accessorFn: (row: any) => row?.duedate,
    id: 'duedate',
    isSortable: true,
    header: 'Due Date',
    cell: (info: any) => info?.getValue(),
  },

  {
    accessorFn: (row: any) => row?.assignedTo,
    id: 'assignedTo',
    isSortable: true,
    header: 'Assigned To',
    cell: (info: any) => info?.getValue(),
  },
];
