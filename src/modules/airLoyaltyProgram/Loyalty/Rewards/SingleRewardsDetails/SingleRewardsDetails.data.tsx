import { DATE_TIME_FORMAT } from '@/constants';
import { LOYALTY_REWARDS_TYPE } from '@/constants/strings';
import { Avatar, Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

export const singleRewardDetailsColumnsDynamic: any = (rewardType?: any) => [
  {
    accessorFn: (row: any) => row?.email,
    id: 'email',
    header: 'Contact Email',
    isSortable: true,
    cell: (info: any) => (
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <Avatar
          src={info?.row?.original?.icon?.src}
          alt={info?.row?.original?.icon?.name}
        />
        <Typography
          variant="body4"
          sx={{
            color: 'blue.dull_blue',
          }}
        >
          {info?.getValue()}
        </Typography>
      </Box>
    ),
  },
  ...(rewardType === LOYALTY_REWARDS_TYPE?.PHYSICAL_REWARD
    ? [
        {
          accessorFn: (row: any) => row?.address,
          id: 'address',
          isSortable: true,
          header: 'Address',
          cell: (info: any) => (
            <Box display={'flex'} flexDirection="column">
              <Typography variant="body4">
                <b>Street:</b> {info?.row?.original?.address?.street}
              </Typography>
              <Typography variant="body4">
                <b> City:</b> {info?.row?.original?.address?.city}
              </Typography>
              <Typography variant="body4">
                <b> Zip Code:</b> {info?.row?.original?.address?.zipCode}
              </Typography>
            </Box>
          ),
        },
        {
          accessorFn: (row: any) => row?.phone,
          id: 'phone',
          isSortable: true,
          header: 'Required Points',
          cell: (info: any) => (
            <Typography variant="body4">{info?.getValue()}</Typography>
          ),
        },
      ]
    : []),
  {
    accessorFn: (row: any) => row?.dateAndTime,
    id: 'dateAndTime',
    isSortable: true,
    header: 'Date and time',
    cell: (info: any) => dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.UI),
  },
];
