import { Box } from '@mui/material';

export const columns: any = [
  {
    accessorFn: (row: any) => row?.taskName,
    id: 'taskName',
    cell: (info: any) => info?.getValue() ?? 'N/A',
    header: 'Task Name',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.campaignDetails[0]?.title,
    id: 'campaignName',
    isSortable: true,
    header: 'Campaign Name',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Actions',
    cell: <Box>select here</Box>,
  },
];
