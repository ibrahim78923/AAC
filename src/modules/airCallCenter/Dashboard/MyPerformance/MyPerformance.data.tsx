import {
  AnsweredCallsImage,
  MissedCallsImage,
  TotalCallsImage,
  TransferredCallsImage,
} from '@/assets/images';
import { Avatar, Box, Typography } from '@mui/material';
import AudioVisualizer from './AudioVisualizer';

export const inComingCallCardArr = [
  {
    title: 'Total Calls',
    totalCall: '120',
    image: TotalCallsImage,
  },
  {
    title: 'Answered Calls',
    totalCall: '120',
    image: AnsweredCallsImage,
  },
  {
    title: 'Missed Calls',
    totalCall: '120',
    image: MissedCallsImage,
  },
  {
    title: 'Transferred Calls',
    totalCall: '120',
    image: TransferredCallsImage,
  },
];

export const outGoingCallCardArr = [
  {
    title: 'Total Calls',
    totalCall: '120',
    image: TotalCallsImage,
  },
  {
    title: 'Missed Calls',
    totalCall: '120',
    image: MissedCallsImage,
  },
  {
    title: 'Answered Calls',
    totalCall: '120',
    image: AnsweredCallsImage,
  },
];

export const columns: any = (theme: any) => [
  {
    accessorFn: (row: any) => row?.customer,
    id: 'customer',
    header: 'Customer',
    cell: (info: any) => (
      <Box display={'flex'} alignItems="center">
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
          textTransform: 'capitalize',
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
    header: 'Assigned To',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.recording,
    id: 'recording',
    header: 'Recording',
    cell: (info: any) => (
      <Box>
        {info?.getValue() !== '-' ? (
          <AudioVisualizer audioSrc={info?.getValue()} />
        ) : (
          '-'
        )}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.lastUpdate,
    id: 'lastUpdate',
    header: 'Last Update',
    cell: (info: any) => info?.getValue(),
  },
];
export const statuses: any = ['Today', 'This Month'];
export const statusDropDown = (setButtonName: any) =>
  statuses?.map((item: any) => ({
    title: item,
    handleClick: (close: any) => {
      setButtonName(item);
      close();
    },
  }));
