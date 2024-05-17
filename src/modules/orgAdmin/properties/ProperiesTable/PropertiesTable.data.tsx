import { Checkbox } from '@mui/material';

export const propertiesTableColumns = [
  {
    accessorFn: (row: any) => row?._id,
    id: 'id',
    cell: () => <Checkbox onChange={() => {}} />,
    header: <Checkbox onChange={() => {}} />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.section,
    id: 'sections',
    isSortable: true,
    header: 'Section',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.createdBy,
    id: 'createdBy',
    isSortable: true,
    header: 'Created By',
    cell: (info: any) => info?.getValue(),
  },
];

export const propertiesTableData = [
  {
    name: 'Orcalo Holdings',
    section: 'Finance',
    createdBy: 'John Doe',
  },
  {
    name: 'Orcalo Holdings',
    section: 'Finance',
    createdBy: 'John Doe',
  },
  {
    name: 'Orcalo Holdings',
    section: 'Finance',
    createdBy: 'John Doe',
  },
  {
    name: 'Orcalo Holdings',
    section: 'Finance',
    createdBy: 'John Doe',
  },
];
