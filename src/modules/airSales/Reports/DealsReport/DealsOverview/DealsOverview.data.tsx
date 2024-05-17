import { DATE_FORMAT, dealStatus } from '@/constants';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import CircleIcon from '@mui/icons-material/Circle';

export const columns: any = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'dealName',
    cell: (info: any) => info?.getValue(),
    header: 'Deal Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.dealOwner?.name,
    id: 'owner',
    isSortable: true,
    header: 'Owner',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.dealPipeline,
    id: 'dealPipeline',
    isSortable: true,
    header: 'Deal Pipeline Stage',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.closeDate,
    id: 'closeDate',
    isSortable: true,
    header: 'Deal Close Date',
    cell: (info: any) => dayjs(info?.getValue()).format(DATE_FORMAT?.UI),
  },
  {
    accessorFn: (row: any) => row?.amount,
    id: 'amount',
    isSortable: true,
    header: 'Amount',
    cell: (info: any) => <Box> £ {info?.getValue()}.00</Box>,
  },
  {
    accessorFn: (row: any) => row?.dealStage,
    id: 'dealStage',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => (
      <Typography
        variant="body4"
        sx={{
          color:
            info?.getValue() === dealStatus?.WON ||
            info?.getValue() === dealStatus?.LOSS
              ? 'success.main'
              : 'custom.bright',
          fontWeight: 500,
          width: 'fit-content',
          borderRadius: '16px',
          backgroundColor:
            info?.getValue() === dealStatus?.WON ||
            info?.getValue() === dealStatus?.LOSS
              ? 'success.bgLighter'
              : 'custom.bgLighter',
          padding: '2px 8px 2px 6px',
          display: 'flex',
          gap: '6px',
          alignItems: 'center',
        }}
      >
        <CircleIcon sx={{ fontSize: '8px' }} />
        {info?.getValue() === dealStatus?.WON ||
        info?.getValue() === dealStatus?.LOSS
          ? 'Close Deal'
          : 'Open Deal'}
      </Typography>
    ),
  },
];
