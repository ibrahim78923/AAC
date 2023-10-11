import { AvatarImage } from '@/assets/images';

import { Avatar, Box, Checkbox, Switch, Typography } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const delegatesData: any = [
  {
    Id: 1,
    DelegateMembers: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
    PhoneNumber: 'Orcalo Holding',
    SignUpDate: 'orcalo@airapple.co.uk',
    EarnedAmmount: 'user select here',
    Status: <Switch {...label} defaultChecked />,
    Actions: 'visibilty icon',
  },
  {
    Id: 2,
    DelegateMembers: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
    PhoneNumber: 'Orcalo Holding',
    SignUpDate: 'orcalo@airapple.co.uk',
    EarnedAmmount: 'user select here',
    Status: <Switch {...label} defaultChecked />,
    Actions: 'visibilty icon',
  },
  {
    Id: 3,
    DelegateMembers: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
    PhoneNumber: 'Orcalo Holding',
    SignUpDate: 'orcalo@airapple.co.uk',
    EarnedAmmount: 'user select here',
    Status: <Switch {...label} defaultChecked />,
    Actions: 'visibilty icon',
  },
  {
    Id: 4,
    DelegateMembers: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
    PhoneNumber: 'Orcalo Holding',
    SignUpDate: 'orcalo@airapple.co.uk',
    EarnedAmmount: 'user select here',
    Status: <Switch {...label} defaultChecked />,
    Actions: 'visibilty icon',
  },
  {
    Id: 5,
    DelegateMembers: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
    PhoneNumber: 'Orcalo Holding',
    SignUpDate: 'orcalo@airapple.co.uk',
    EarnedAmmount: 'user select here',
    Status: <Switch {...label} defaultChecked />,
    Actions: 'visibilty icon',
  },
  {
    Id: 6,
    DelegateMembers: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
    PhoneNumber: 'Orcalo Holding',
    SignUpDate: 'orcalo@airapple.co.uk',
    EarnedAmmount: 'user',
    Status: <Switch {...label} defaultChecked />,
    Actions: 'visibilty icon',
  },
];

export const delegatesColumns: any = [
  {
    accessorFn: (row: any) => row.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.DelegateMembers,
    id: 'delegateMembers',
    cell: (info: any) => info.getValue(),
    header: 'Delegate Members',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.PhoneNumber,
    id: 'phoneNumber',
    isSortable: true,
    header: 'Phone Number',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.SignUpDate,
    id: 'signUpDate',
    isSortable: true,
    header: 'Sign Up Date',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.EarnedAmmount,
    id: 'earnedAmmount',
    isSortable: true,
    header: 'Earned Ammount',
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
    accessorFn: (row: any) => row.Actions,
    id: 'Action',
    isSortable: true,
    header: 'Action',
    cell: (info: any) => info.getValue(),
  },
];
