import { Avatar, Box, Button, Typography } from '@mui/material';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import { ActionDropDown } from './ActionDropDown';

export const columns: any = [
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
    accessorFn: (row: any) => row?.queue,
    id: 'queue',
    header: 'queue',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.waitTime,
    id: 'waitTime',
    header: 'Wait Time',
    cell: (info: any) => (
      <Box display={'flex'}>
        {info?.row?.original?.waitTime == 0 ? (
          <PhoneCallbackIcon sx={{ cursor: 'pointer' }} />
        ) : (
          info?.row?.original?.waitTime
        )}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.Action,
    id: 'Action',
    header: 'Action',
    cell: (info: any) => {
      return <ActionDropDown data={info} />;
    },
  },
];

export const agentColumns: any = [
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
            {info?.row?.original?.Availability}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.timeSpent,
    id: 'timeSpent',
    header: 'Time Spent',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.Action,
    id: 'Action',
    header: 'Action',
    cell: (info: any) => {
      return <ActionDropDown data={info} />;
    },
  },
];

export const conversationColumns: any = [
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
        </Box>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.agent,
    id: 'agent',
    header: 'agent',
    cell: (info: any) => (
      <Box display={'flex'}>
        <Avatar
          sx={{ bgcolor: 'blue.light', fontSize: '14px', fontWeight: 500 }}
        >
          {info?.row?.original?.heading?.slice(0, 2)?.toUpperCase()}
        </Avatar>
        <Box mx={2}>
          <Typography variant="body2" fontWeight={500} color={'common.black'}>
            {info?.row?.original?.agent}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.Action,
    id: 'Action',
    header: '',
    cell: () => {
      return (
        <Button className="small" variant="contained">
          Join
        </Button>
      );
    },
  },
];
