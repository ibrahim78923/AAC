import {
  Avatar,
  AvatarGroup,
  Box,
  Checkbox,
  Stack,
  Typography,
} from '@mui/material';

import { styles } from '../SMSDashboard/ScheduledSMS/ScheduledSMS.style';

import LinearProgress from '@mui/material/LinearProgress';

import Link from 'next/link';

export const broadcastData: any = [
  {
    Id: 1,
    name: 'Test broad',
    CreatedOn: '10/04/2023',
    Successful: '100%',
    Replied: '55%',
    Status: 'Completed',
  },
  {
    Id: 2,
    name: 'Demo broadcast',
    CreatedOn: '10/04/2023',
    Successful: '100%',
    Replied: '55%',
    Status: 'Scheduled',
  },
  {
    Id: 3,
    name: 'Test Campaign sankalp',
    CreatedOn: '10/04/2023',
    Successful: '100%',
    Replied: '55%',
    Status: 'Draft',
  },
  {
    Id: 3,
    name: 'Test Campaign sankalp',
    CreatedOn: '10/04/2023',
    Successful: '100%',
    Replied: '55%',
    Status: 'Processing',
  },
];

export const broadcastColumns: any = (statusTag: any, theme: any) => {
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: false,
      header: 'Name',
      cell: (info: any) => (
        <Link
          href={'/air-marketer/sms-marketing/sms-marketing-details'}
          style={{ color: theme?.palette?.custom?.bright, fontWeight: 600 }}
        >
          {info?.getValue()}
        </Link>
      ),
    },
    {
      accessorFn: (row: any) => row?.CreatedOn,
      id: 'createdOn',
      isSortable: false,
      header: 'Created On',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.Successful,
      id: 'successful',
      isSortable: false,
      header: 'Successful',
      cell: (
        <Stack gap={1}>
          <Typography variant="body2" textAlign={'center'}>
            100%
          </Typography>
          <LinearProgress variant="determinate" value={100} />
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.Replied,
      id: 'replied',
      isSortable: false,
      header: 'Replied',
      cell: (
        <Stack gap={1}>
          <Typography variant="body2" textAlign={'center'}>
            60%
          </Typography>
          <LinearProgress variant="determinate" value={50} />
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.Recipients,
      id: 'Recipients',
      isSortable: false,
      header: 'Recipients',
      cell: (
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src="" />
            <Avatar alt="Travis Howard" src="" />
            <Avatar alt="Cindy Baker" src="" />
            <Avatar alt="Agnes Walker" src="" />
            <Avatar alt="Trevor Henderson" src="" />
          </AvatarGroup>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.Failed,
      id: 'failed',
      isSortable: false,
      header: 'Failed',
      cell: (
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src="" />
            <Avatar alt="Travis Howard" src="" />
            <Avatar alt="Cindy Baker" src="" />
            <Avatar alt="Agnes Walker" src="" />
            <Avatar alt="Trevor Henderson" src="" />
          </AvatarGroup>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.Status,
      id: 'status',
      isSortable: false,
      header: 'Status',
      cell: (info: any) => (
        <Box sx={styles?.cardHeader}>
          <Box
            sx={{
              width: '10px',
              height: '10px',
              backgroundColor: `${statusTag(info?.getValue())}`,
              borderRadius: '50%',
            }}
          />
          {info?.getValue()}
        </Box>
      ),
    },
  ];
};
