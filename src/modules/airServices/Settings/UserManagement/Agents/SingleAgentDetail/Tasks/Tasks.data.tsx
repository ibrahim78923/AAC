import { Typography } from '@mui/material';

export const tasksColumnsDynamic: any = () => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Typography variant="body4" color="custom.bright">
          #TSK-{info?.getValue()?.slice(-3)?.toUpperCase()}
        </Typography>
      ),
      header: 'Task ID',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.title,
      id: 'title',
      isSortable: true,
      header: 'Task Name',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info?.getValue(),
    },
  ];
};
