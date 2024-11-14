import { Checkbox } from '@mui/material';

export const FormsData: any = [
  {
    Id: 1,
    Forms: `Forms1`,
  },
  {
    Id: 2,
    Forms: `Forms2`,
  },
];

export const FormsColumns: any = [
  {
    accessorFn: (row: any) => row?.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.Forms,
    id: 'form',
    cell: (info: any) => info?.getValue(),
    header: 'Forms',
    isSortable: false,
  },
];
