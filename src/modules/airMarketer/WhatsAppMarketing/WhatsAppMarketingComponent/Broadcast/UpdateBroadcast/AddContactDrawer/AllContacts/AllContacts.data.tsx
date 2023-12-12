import { Avatar, Checkbox, Stack, Typography } from '@mui/material';

import { AvatarImage } from '@/assets/images';

export const allContactsData: any = [
  {
    Id: 1,
    Name: 'Kristin Waston',
    PhoneNumber: '(219)555-0114',
  },
  {
    Id: 2,
    Name: 'Esther Howard',
    PhoneNumber: '(201)555-0124',
  },
  {
    Id: 3,
    Name: 'Cody Fisher',
    PhoneNumber: '(219)555-0114',
  },
  {
    Id: 4,
    Name: 'Wade Warren',
    PhoneNumber: '(201)555-0124',
  },
  {
    Id: 5,
    Name: 'Brooklyn Simmons',
    PhoneNumber: '(219)555-0114',
  },
  {
    Id: 6,
    Name: 'Albert Flores',
    PhoneNumber: '(201)555-0124',
  },
];

export const allContactsColumns: any = [
  {
    accessorFn: (row: any) => row?.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.Name,
    id: 'name',
    isSortable: false,
    header: 'Name',
    cell: (info: any) => (
      <Stack direction="row" gap={1} alignItems="center">
        <Avatar alt="Remy Sharp" src={AvatarImage?.src} />
        <Typography>{info?.getValue()}</Typography>
      </Stack>
    ),
  },
  {
    accessorFn: (row: any) => row?.PhoneNumber,
    id: 'phoneNumber',
    isSortable: false,
    header: 'Phone Number',
    cell: (info: any) => info?.getValue(),
  },
];
