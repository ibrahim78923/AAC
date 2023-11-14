import { Avatar, AvatarGroup, Box, Checkbox } from '@mui/material';

import { styles } from '../SMSDashboard/ScheduledSMS/ScheduledSMS.style';

import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';

import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

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

export const broadcastColumns: any = (statusTag: any) => [
  {
    accessorFn: (row: any) => row.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.name,
    id: 'name',
    isSortable: false,
    header: 'Name',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.CreatedOn,
    id: 'createdOn',
    isSortable: true,
    header: 'Created On',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Successful,
    id: 'successful',
    isSortable: true,
    header: 'Successful',
    cell: <BorderLinearProgress variant="determinate" value={50} />,
  },
  {
    accessorFn: (row: any) => row.Replied,
    id: 'replied',
    isSortable: true,
    header: 'Replied',
    cell: <BorderLinearProgress variant="determinate" value={50} />,
  },
  {
    accessorFn: (row: any) => row.Recipients,
    id: 'Recipients',
    isSortable: true,
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
    accessorFn: (row: any) => row.Failed,
    id: 'failed',
    isSortable: true,
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
    accessorFn: (row: any) => row.Status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => (
      <Box sx={styles.cardHeader}>
        <Box
          sx={{
            width: '10px',
            height: '10px',
            backgroundColor: `${statusTag(info.getValue())}`,
            borderRadius: '50%',
          }}
        />
        {info.getValue()}
      </Box>
    ),
  },
];
