import { Box } from '@mui/material';

export const columns: any = [
  {
    accessorFn: (row: any) => row?.email,
    id: 'email',
    cell: (info: any) => info?.getValue(),
    header: 'Email',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row?.sent,
    id: 'sent',
    cell: (info: any) => info?.getValue(),
    header: 'Sent',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row?.clickThroughRate,
    id: 'clickThroughRate',
    isSortable: false,
    header: (
      <Box textAlign="center" width="100%">
        Click Through Rate
      </Box>
    ),
    cell: (info: any) => <Box textAlign="center">{info?.getValue()}</Box>,
  },

  {
    accessorFn: (row: any) => row?.deliverRate,
    id: 'deliverRate',
    isSortable: false,
    header: (
      <Box textAlign="center" width="100%">
        Deliver Rate
      </Box>
    ),
    cell: (info: any) => <Box textAlign="center">{info?.getValue()}</Box>,
  },

  {
    accessorFn: (row: any) => row?.opened,
    id: 'opened',
    isSortable: false,
    header: (
      <Box textAlign="center" width="100%">
        Opened
      </Box>
    ),
    cell: (info: any) => <Box textAlign="center">{info?.getValue()}</Box>,
  },
];
