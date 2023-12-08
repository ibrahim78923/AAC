export const columns: any = [
  {
    accessorFn: (row: any) => row?.taskName,
    id: 'taskName',
    cell: (info: any) => info?.getValue(),
    header: 'Task Name',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.taskStatus,
    id: 'taskStatus',
    isSortable: true,
    header: 'Task Status',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.taskType,
    id: 'taskType',
    isSortable: true,
    header: 'Task Type',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.assignedUser,
    id: 'assignedUser',
    isSortable: true,
    header: 'Assigned User',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.lastDate,
    id: 'lastDate',
    isSortable: true,
    header: 'Last Date',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.taskNotes,
    id: 'taskNotes',
    isSortable: true,
    header: 'Task Notes',
    cell: (info: any) => info?.getValue(),
  },
];
