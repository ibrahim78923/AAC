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
    header: 'Title',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row?.taskname,
    id: 'Owner',
    isSortable: true,
    header: 'Owner',
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
    id: 'outcome',
    isSortable: true,
    header: 'Outcome',
    cell: (info: any) => info?.getValue(),
  },
];

export const callsDetails: Record<string, number> = {
  All: 0,
  Upcoming: 0,
  Completed: 0,
};

export const callsStatusColor: Record<string, string> = {
  All: '#0AADC7',
  Upcoming: '#FF4A4A',
  Completed: '#47B263',
};
