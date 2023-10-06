import { Checkbox } from '@mui/material';

import { Avatar, AvatarGroup, Switch, Box, Typography } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const data: any = [
  {
    Id: 1,
    UserId: `123`,
    Name: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
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
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
      </AvatarGroup>
    ),
    Status: <Switch {...label} defaultChecked />,
    CreatedOn: '12/10/2023',
  },
  {
    Id: 2,
    UserId: `456`,
    Name: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
    UserType: 'Super Admin',
    OrganizationName: '-',
    Products: '-',
    Status: <Switch {...label} defaultChecked />,
    CreatedOn: '12/10/2023',
  },
  {
    Id: 3,
    UserId: `789`,
    Name: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
    UserType: 'Super Admin',
    OrganizationName: '-',
    Products: '-',
    Status: <Switch {...label} defaultChecked />,
    CreatedOn: '12/10/2023',
  },
  {
    Id: 4,
    UserId: `752`,
    Name: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
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
        <Avatar alt="Remy Sharp" src={'/static/images/avatar/1.jpg'} />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
      </AvatarGroup>
    ),
    Status: <Switch {...label} defaultChecked />,
    CreatedOn: '12/10/2023',
  },
];

export const columns: any = [
  {
    accessorFn: (row: any) => row.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
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
];
