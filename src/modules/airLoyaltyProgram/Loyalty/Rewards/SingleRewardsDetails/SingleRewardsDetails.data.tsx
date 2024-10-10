import { UserInfo } from '@/components/UserInfo';
import { DATE_TIME_FORMAT } from '@/constants';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

export const singleRewardDetailsColumnsDynamic = () => [
  {
    accessorFn: (row: any) => row?.consumers,
    id: 'consumers',
    header: 'Consumers',
    isSortable: true,
    cell: (info: any) => (
      <UserInfo
        nameInitial={fullNameInitial(info?.row?.original?.icon?.name)}
        name={fullName(info?.row?.original?.icon?.name)}
        avatarSrc={info?.row?.original?.icon?.src}
        email={info?.getValue()}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.address,
    id: 'address',
    isSortable: true,
    header: 'Address',
    cell: (info: any) => (
      <Box display={'flex'} flexDirection="column">
        <Typography variant="body2">
          {info?.row?.original?.address?.street}
        </Typography>
        <Typography variant="body2">
          {info?.row?.original?.address?.city}
        </Typography>
        <Typography variant="body2">
          {info?.row?.original?.address?.zipCode}
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.dateAndTime,
    id: 'dateAndTime',
    isSortable: true,
    header: 'Created at',
    cell: (info: any) => dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.UI),
  },
];
