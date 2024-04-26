import { Avatar, Box, Typography } from '@mui/material';
import { AvatarImage } from '@/assets/images';
import dayjs from 'dayjs';

export const singleDigitalDetailsData = [
  {
    id: 1,
    email: `Cumaran@yahoo.com`,
    dateAndTime: '2023-12-14T11:59:08.238Z',
    icon: AvatarImage,
  },
  {
    id: 2,
    email: `jaxwab@icloud.com`,
    dateAndTime: '2023-12-14T11:59:08.238Z',
    icon: AvatarImage,
  },
  {
    id: 3,
    email: `pkplus@me.com`,
    dateAndTime: `2023-12-14T11:59:08.238Z`,
    icon: AvatarImage,
  },
];
export const singleDigitalDetailsColumns: any = [
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
        />{' '}
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
  {
    accessorFn: (row: any) => row?.dateAndTime,
    id: 'dateAndTime',
    isSortable: true,
    header: 'Date and time',
    cell: (info: any) =>
      dayjs(info?.getValue())?.format('MMMM DD, YYYY: hh:mm'),
  },
];
