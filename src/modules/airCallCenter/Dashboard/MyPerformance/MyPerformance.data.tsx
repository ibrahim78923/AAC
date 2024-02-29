import { CardbgImage } from '@/assets/images';
import { Avatar, Box, Typography } from '@mui/material';

export const inComingCallCardArr = [
  {
    title: 'Total Calls',
    totalCall: '120',
    image: CardbgImage,
  },
  {
    title: 'Answered Calls',
    totalCall: '120',
    image: CardbgImage,
  },
  {
    title: 'Missed Calls',
    totalCall: '120',
    image: CardbgImage,
  },
  {
    title: 'Transferred Calls',
    totalCall: '120',
    image: CardbgImage,
  },
];

export const outGoingCallCardArr = [
  {
    title: 'Total Calls',
    totalCall: '120',
    image: CardbgImage,
  },
  {
    title: 'Missed Calls',
    totalCall: '120',
    image: CardbgImage,
  },
  {
    title: 'Answered Calls',
    totalCall: '120',
    image: CardbgImage,
  },
];

export const columns: any = (theme: any) => [
  {
    accessorFn: (row: any) => row?.customer,
    id: 'customer',
    header: 'customer',
    cell: (info: any) => (
      <Box display={'flex'}>
        <Avatar
          sx={{ bgcolor: 'blue.light', fontSize: '14px', fontWeight: 500 }}
        >
          {info?.row?.original?.heading?.slice(0, 2)?.toUpperCase()}
        </Avatar>
        <Box mx={2}>
          <Typography variant="body2" fontWeight={500} color={'common.black'}>
            {info?.row?.original?.customer}
          </Typography>
          <Typography variant="body3" color={'grey.900'}>
            {info?.row?.original?.discription}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.Status,
    id: 'Status',
    header: 'Status',
    cell: (info: any) => (
      <Box
        sx={{
          color: 'white',
          borderRadius: '25px',
          textAlign: 'center',
          padding: '4px',
          backgroundColor:
            info?.row?.original?.Status === 'answered call'
              ? theme?.palette?.success?.main
              : info?.row?.original?.Status === 'missed call'
                ? theme?.palette?.error?.main
                : theme?.palette?.warning?.main,
        }}
      >
        {info?.row?.original?.Status}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.assignedTo,
    id: 'assignedTo',
    header: 'assigned to',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.recording,
    id: 'recording',
    header: 'Recording',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.lastUpdate,
    id: 'lastUpdate',
    header: 'Last Update',
    cell: (info: any) => info?.getValue(),
  },
];
