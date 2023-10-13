import { Checkbox } from '@mui/material';

import { Avatar, AvatarGroup, Switch, Box, Typography } from '@mui/material';

import RHFSelect from '@/components/ReactHookForm/RHFSelect';

import RHFTextField from '@/components/ReactHookForm/RHFTextField';

import RHFDatePicker from '@/components/ReactHookForm/RHFDatePicker';

import { AvatarImage } from '@/assets/images';

import * as Yup from 'yup';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const data: any = [
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
        <Avatar alt="Agnes Walker" src={AvatarImage.src} />
        <Avatar alt="Trevor Henderson" src={AvatarImage.src} />
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
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
    UserType: 'Company Owner',
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
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
    UserType: 'Company Owner',
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
        <Avatar alt="Agnes Walker" src={AvatarImage.src} />
        <Avatar alt="Trevor Henderson" src={AvatarImage.src} />
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

export const superAdminUsersData: any = [
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
    UserType: 'Super Admin',
    OrganizationName: 'Extreme Commerce',
    Products: (
      <AvatarGroup max={4} sx={{ display: 'flex', justifyContent: 'start' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Avatar alt="Travis Howard" src={AvatarImage.src} />
        <Avatar alt="Cindy Baker" src={AvatarImage.src} />
        <Avatar alt="Agnes Walker" src={AvatarImage.src} />
        <Avatar alt="Trevor Henderson" src={AvatarImage.src} />
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
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
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
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
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
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
    UserType: 'Super Admin',
    OrganizationName: '10 Pearls',
    Products: (
      <AvatarGroup max={4} sx={{ display: 'flex', justifyContent: 'start' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Avatar alt="Travis Howard" src={AvatarImage.src} />
        <Avatar alt="Cindy Baker" src={AvatarImage.src} />
        <Avatar alt="Agnes Walker" src={AvatarImage.src} />
        <Avatar alt="Trevor Henderson" src={AvatarImage.src} />
      </AvatarGroup>
    ),
    Status: <Switch {...label} defaultChecked />,
    CreatedOn: '12/10/2023',
  },
];

export const superAdminColumns: any = [
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

export const usersValidationSchema = Yup.object().shape({
  userType: Yup.string().required('Field is Required'),
  organiztaionName: Yup.string().required('Field is Required'),
  product: Yup.string().required('Field is Required'),
  createdDate: Yup.date().required('Field is Required'),
});

export const usersDefaultValues = {
  userType: '',
  organizationName: '',
  product: '',
  createdDate: new Date(),
};

export const usersFilterArray = [
  {
    componentProps: {
      name: 'userType',
      label: 'User Type',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'CompanyOwner', label: 'Company Owner' },
      { value: 'SuperAdmin', label: 'Super Admin' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'organizationName',
      label: 'Organization Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'product',
      label: 'Product',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
];
