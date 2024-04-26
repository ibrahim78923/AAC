import { Avatar, Box, Checkbox, Typography } from '@mui/material';

import { SwitchBtn } from '@/components/SwitchButton';

import { AvatarImage } from '@/assets/images';

import { EyeIcon } from '@/assets/icons';

export const delegatesData: any = [
  {
    Id: 1,
    PhoneNumber: 'Orcalo Holding',
    SignUpDate: 'orcalo@airapple.co.uk',
    EarnedAmmount: 'user select here',
  },
  {
    Id: 2,
    PhoneNumber: 'Orcalo Holding',
    SignUpDate: 'orcalo@airapple.co.uk',
    EarnedAmmount: 'user select here',
  },
  {
    Id: 3,
    PhoneNumber: 'Orcalo Holding',
    SignUpDate: 'orcalo@airapple.co.uk',
    EarnedAmmount: 'user select here',
  },
  {
    Id: 4,
    PhoneNumber: 'Orcalo Holding',
    SignUpDate: 'orcalo@airapple.co.uk',
    EarnedAmmount: 'user select here',
  },
  {
    Id: 5,
    PhoneNumber: 'Orcalo Holding',
    SignUpDate: 'orcalo@airapple.co.uk',
    EarnedAmmount: 'user select here',
  },
  {
    Id: 6,
    PhoneNumber: 'Orcalo Holding',
    SignUpDate: 'orcalo@airapple.co.uk',
    EarnedAmmount: 'user',
  },
];

export const delegatesColumns: any = [
  {
    accessorFn: (row: any) => row?.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.DelegateMembers,
    id: 'delegateMembers',
    isSortable: false,
    header: 'Delegate Members',
    cell: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.PhoneNumber,
    id: 'phoneNumber',
    isSortable: true,
    header: 'Phone Number',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.SignUpDate,
    id: 'signUpDate',
    isSortable: true,
    header: 'Sign Up Date',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.EarnedAmmount,
    id: 'earnedAmmount',
    isSortable: true,
    header: 'Earned Amount',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.Status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: <SwitchBtn defaultChecked />,
  },
  {
    accessorFn: (row: any) => row?.Actions,
    id: 'Action',
    isSortable: true,
    header: 'Action',
    cell: () => (
      <Box sx={{ cursor: 'pointer' }}>
        <EyeIcon />
      </Box>
    ),
  },
];
