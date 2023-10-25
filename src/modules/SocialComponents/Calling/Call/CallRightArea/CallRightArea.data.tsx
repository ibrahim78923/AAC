import { Box } from '@mui/material';
import { InComingIcon, OutgoingIcon } from '@/assets/icons';

export const columns = () => {
  return [
    {
      accessorFn: (row: any) => row.type,
      id: 'type',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {' '}
          {info.getValue() === 'Outgoing' && (
            <>
              <OutgoingIcon /> {info.getValue()}
            </>
          )}{' '}
          {info.getValue() === 'Incoming' && (
            <>
              <InComingIcon /> {info.getValue()}
            </>
          )}{' '}
        </Box>
      ),
      header: 'Type',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.time,
      id: 'time',
      header: 'Time',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.date,
      id: 'date',
      header: 'Date',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.duration,
      id: 'duration',
      header: 'Duration',
      cell: (info: any) => info.getValue(),
    },
  ];
};
