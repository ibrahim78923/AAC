import { DATE_FORMAT } from '@/constants';
import { Checkbox } from '@mui/material';

import dayjs from 'dayjs';

export const RestoreTableColumns: any = [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
    header: <Checkbox color="primary" name="id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Deal Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.deletedBy?.name,
    id: 'deletedby',
    isSortable: true,
    header: 'Deleted By',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.deletedAt,
    id: 'deletedAt',
    isSortable: true,
    header: 'Time Deleted',
    cell: (info: any) => dayjs(info?.getValue()).format(DATE_FORMAT?.UI),
  },
];
