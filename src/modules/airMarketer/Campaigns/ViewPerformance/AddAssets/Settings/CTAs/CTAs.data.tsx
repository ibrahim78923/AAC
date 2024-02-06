import { Checkbox } from '@mui/material';

export const performanceData: any = [
  {
    Id: 1,
    addCampaign: `New Campaign Group`,
  },
  {
    Id: 2,
    addCampaign: `New Campaign Group`,
  },
];

export const performanceColumns: any = [
  {
    accessorFn: (row: any) => row?.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.addCampaign,
    id: 'addCampaign',
    cell: (info: any) => info?.getValue(),
    header: 'Add Campaign',
    isSortable: false,
  },
];
