import { RHFDatePicker } from '@/components/ReactHookForm';
import { Checkbox } from '@mui/material';

export const restoreArr = [
  {
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
      select: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
      select: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
];

export const columns: any = [
  {
    accessorFn: (row: any) => row.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.name,
    id: 'name',
    cell: (info: any) => info.getValue(),

    header: 'Company Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.deletedBy,
    id: 'deletedBy',
    isSortable: true,
    header: 'Deleted By',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.timeDeleted,
    id: 'timeDeleted',
    isSortable: true,
    header: 'Tome Deleted',
    cell: (info: any) => info.getValue(),
  },
];

export const restoreTableData = [
  {
    Id: 1,
    name: 'My File.pdf',
    deletedBy: '10',
    timeDeleted: '11',
  },
];
