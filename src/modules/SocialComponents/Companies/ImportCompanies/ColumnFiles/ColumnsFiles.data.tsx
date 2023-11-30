import { MenuItem, Select } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const columns: any = [
  {
    accessorFn: (row: any) => row?.fileColumns,
    id: 'fileColumns',
    cell: (info: any) => info?.getValue(),
    header: 'File Columns',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.crmFields,
    id: 'crmFields',
    isSortable: false,
    header: 'CRM Fields',
    cell: (info: any) => (
      <Select
        fullWidth
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Age"
        name={info?.getValue()}
      >
        <MenuItem value={10}>Mandatory Fields</MenuItem>
        <MenuItem value={20}>Domain Name</MenuItem>
        <MenuItem value={30}>Company Name</MenuItem>
        <MenuItem value={30}>Optional Fields</MenuItem>
        <MenuItem value={30}>Marketing Owner</MenuItem>
      </Select>
    ),
  },
  {
    accessorFn: (row: any) => row?.mapped,
    id: 'mapped',
    cell: (info: any) => (
      <CheckCircleIcon color="primary" name={info?.getValue()} />
    ),
    header: 'Mapped',
    isSortable: false,
  },
];
