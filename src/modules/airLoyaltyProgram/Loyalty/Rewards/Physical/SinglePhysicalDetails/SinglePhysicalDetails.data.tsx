import { Avatar, Box, Typography } from '@mui/material';
import { AvatarImage } from '@/assets/images';
import dayjs from 'dayjs';

export const singlePhysicalDetailsData = [
  {
    id: 1,
    email: `Cumaran@yahoo.com`,
    address: { street: '53 Tadcaster Rd', city: 'Pilsley', zipCode: 'S45 4NZ' },
    phone: `1 (555) 123-4567`,
    dateAndTime: `2023-12-14T11:59:08.238Z`,
    icon: AvatarImage,
  },
  {
    id: 2,
    email: `jaxwab@icloud.com`,
    address: { street: '53 Tadcaster Rd', city: 'Pilsley', zipCode: 'S45 4NZ' },
    phone: `1 (555) 123-4567`,
    dateAndTime: `2023-12-14T11:59:08.238Z`,
    icon: AvatarImage,
  },
  {
    id: 3,
    email: `pkplus@me.com`,
    address: { street: '53 Tadcaster Rd', city: 'Pilsley', zipCode: 'S45 4NZ' },
    phone: `1 (555) 123-4567`,
    dateAndTime: `2023-12-14T11:59:08.238Z`,
    icon: AvatarImage,
  },
];
export const singlePhysicalDetailsColumns: any = [
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
  {
    accessorFn: (row: any) => row?.dateAndTime,
    id: 'dateAndTime',
    isSortable: true,
    header: 'Date and time',
    cell: (info: any) =>
      dayjs(info?.getValue())?.format('MMMM DD, YYYY: hh:mm'),
  },
];
