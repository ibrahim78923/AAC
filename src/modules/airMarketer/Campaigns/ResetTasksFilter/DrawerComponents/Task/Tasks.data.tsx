import { Box } from '@mui/material';

export const data: any = [
  {
    taskName: ` @olivia`,
    campaignName: 'Draftstrtr',
  },
  {
    taskName: ` @olivia`,
    campaignName: 'Draftstrtr',
  },
  {
    taskName: ` @olivia`,
    campaignName: 'Draftstrtr',
  },
];

export const columns: any = [
  {
    accessorFn: (row: any) => row?.taskName,
    id: 'taskName',
    cell: (info: any) => info?.getValue(),
    header: 'Task Name',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.campaignName,
    id: 'campaignName',
    isSortable: true,
    header: 'Campaign Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Actions',
    cell: <Box>select here</Box>,
  },
];
