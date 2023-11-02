import { Avatar, AvatarGroup, Switch, Box, Typography } from '@mui/material';

import { AvatarImage } from '@/assets/images';
import Link from 'next/link';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const usersData: any = [
  {
    Id: 1,
    UserId: `123`,
    Name: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
    UserType: 'Company Owner',
    OrganizationName: 'Extreme Commerce',
    Products: (
      <AvatarGroup max={4} sx={{ display: 'flex', justifyContent: 'start' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Avatar alt="Travis Howard" src={AvatarImage.src} />
        <Avatar alt="Cindy Baker" src={AvatarImage.src} />
      </AvatarGroup>
    ),
    Status: <Switch {...label} defaultChecked />,
    CreatedOn: '12/10/2023',
    details: <Link href="/super-admin/user-management">View Users</Link>,
  },
  {
    Id: 2,
    UserId: `456`,
    Name: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
    UserType: 'Company Owner',
    OrganizationName: 'Orcalo Holdings',
    Products: (
      <AvatarGroup max={4} sx={{ display: 'flex', justifyContent: 'start' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Avatar alt="Travis Howard" src={AvatarImage.src} />
        <Avatar alt="Cindy Baker" src={AvatarImage.src} />
      </AvatarGroup>
    ),
    Status: <Switch {...label} defaultChecked />,
    CreatedOn: '12/10/2023',
    details: <Link href="/super-admin/user-management">View Users</Link>,
  },
  {
    Id: 3,
    UserId: `789`,
    Name: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
    UserType: 'Company Owner',
    OrganizationName: 'Orcalo Holdings',
    Products: (
      <AvatarGroup max={4} sx={{ display: 'flex', justifyContent: 'start' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Avatar alt="Travis Howard" src={AvatarImage.src} />
        <Avatar alt="Cindy Baker" src={AvatarImage.src} />
      </AvatarGroup>
    ),
    Status: <Switch {...label} defaultChecked />,
    CreatedOn: '12/10/2023',
    details: <Link href="/super-admin/user-management">View Users</Link>,
  },
  {
    Id: 4,
    UserId: `752`,
    Name: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
    UserType: 'Company Owner',
    OrganizationName: '10 Pearls',
    Products: (
      <AvatarGroup max={4} sx={{ display: 'flex', justifyContent: 'start' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Avatar alt="Travis Howard" src={AvatarImage.src} />
        <Avatar alt="Cindy Baker" src={AvatarImage.src} />
      </AvatarGroup>
    ),
    Status: <Switch {...label} defaultChecked />,
    CreatedOn: '12/10/2023',
    details: <Link href="/super-admin/user-management">View Users</Link>,
  },
];

export const usersColumns: any = [
  {
    accessorFn: (row: any) => row.UserId,
    id: 'userId',
    cell: (info: any) => info.getValue(),
    header: 'UserID',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.Name,
    id: 'name',
    isSortable: true,
    header: 'Name',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.UserType,
    id: 'userType',
    isSortable: true,
    header: 'UserType',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.OrganizationName,
    id: 'organizationName',
    isSortable: true,
    header: 'OrganizationName',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Products,
    id: 'products',
    isSortable: true,
    header: 'Products',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.CreatedOn,
    id: 'createdOn',
    isSortable: true,
    header: 'CreatedOn',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.details,
    id: 'details',
    isSortable: true,
    header: 'Details',
    cell: (info: any) => info.getValue(),
  },
];
