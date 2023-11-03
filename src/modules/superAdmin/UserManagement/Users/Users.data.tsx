import { Checkbox } from '@mui/material';

import { Avatar, AvatarGroup, Box, Typography } from '@mui/material';

import RHFSelect from '@/components/ReactHookForm/RHFSelect';

import RHFDatePicker from '@/components/ReactHookForm/RHFDatePicker';

import { SwitchBtn } from '@/components/SwitchButton';

import { AvatarImage } from '@/assets/images';

import * as Yup from 'yup';
import dayjs from 'dayjs';

export const columns: any = [
  {
    accessorFn: (row: any) => row?.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?._id,
    id: 'userId',
    header: 'UserID',
    isSortable: false,
    cell: (info: any) => info.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.Name,
    id: 'name',
    isSortable: true,
    header: 'Name',
    cell: (info: any) => (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage?.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>
            {info?.row?.original?.firstName} {info?.row?.original?.lastName}
          </Typography>
          <Typography component={'span'}>
            {info?.row?.original?.email}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.role,
    id: 'userType',
    isSortable: true,
    header: 'UserType',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.OrganizationName,
    id: 'organizationName',
    isSortable: true,
    header: 'OrganizationName',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.Products,
    id: 'products',
    isSortable: true,
    header: 'Products',
    cell: (
      <AvatarGroup max={4} sx={{ display: 'flex', justifyContent: 'start' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage?.src} />
        <Avatar alt="Travis Howard" src={AvatarImage?.src} />
        <Avatar alt="Cindy Baker" src={AvatarImage?.src} />
        <Avatar alt="Agnes Walker" src={AvatarImage?.src} />
        <Avatar alt="Trevor Henderson" src={AvatarImage?.src} />
      </AvatarGroup>
    ),
  },
  {
    accessorFn: (row: any) => row?.Status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => (
      <SwitchBtn
        checked={info?.row?.original?.status === 'ACTIVE' ? true : false}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdOn',
    isSortable: true,
    header: 'CreatedOn',
    cell: (info: any) =>
      dayjs(info?.row?.original?.createdAt).format('DD/MM/YYYY'),
  },
];

export const superAdminUsersData: any = [
  {
    Id: 1,
    UserId: `123`,
    UserType: 'Super Admin',
    OrganizationName: 'Extreme Commerce',
    CreatedOn: '12/10/2023',
  },
  {
    Id: 2,
    UserId: `456`,
    UserType: 'Super Admin',
    OrganizationName: '-',
    Products: '-',
    CreatedOn: '12/10/2023',
  },
  {
    Id: 3,
    UserId: `789`,
    UserType: 'Super Admin',
    OrganizationName: '-',
    Products: '-',
    CreatedOn: '12/10/2023',
  },
  {
    Id: 4,
    UserId: `752`,
    UserType: 'Super Admin',
    OrganizationName: '10 Pearls',
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
    accessorFn: (row: any) => row?._id,
    id: 'userId',
    header: 'UserID',
    isSortable: false,
    cell: (info: any) => info.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.Name,
    id: 'name',
    isSortable: true,
    header: 'Name',
    cell: (info: any) => (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage?.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>
            {info?.row?.original?.firstName} {info?.row?.original?.lastName}
          </Typography>
          <Typography component={'span'}>
            {info?.row?.original?.email}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.role,
    id: 'userType',
    isSortable: true,
    header: 'UserType',
    cell: (info: any) => info.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.OrganizationName,
    id: 'organizationName',
    isSortable: true,
    header: 'OrganizationName',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.Products,
    id: 'products',
    isSortable: true,
    header: 'Products',
    cell: (
      <AvatarGroup max={4} sx={{ display: 'flex', justifyContent: 'start' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage?.src} />
        <Avatar alt="Travis Howard" src={AvatarImage?.src} />
        <Avatar alt="Cindy Baker" src={AvatarImage?.src} />
        <Avatar alt="Agnes Walker" src={AvatarImage?.src} />
        <Avatar alt="Trevor Henderson" src={AvatarImage?.src} />
      </AvatarGroup>
    ),
  },
  {
    accessorFn: (row: any) => row?.Status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => (
      <SwitchBtn
        checked={info?.row?.original?.status === 'ACTIVE' ? true : false}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.createdOn,
    id: 'createdOn',
    isSortable: true,
    header: 'CreatedOn',
    cell: (info: any) =>
      dayjs(info?.row?.original?.createdAt).format('DD/MM/YYYY'),
  },
];

export const usersValidationSchema = Yup.object().shape({
  userType: Yup.string().required('Field is Required'),
  organizationName: Yup.string().required('Field is Required'),
  product: Yup.string().required('Field is Required'),
  createdDate: Yup.date().required('Field is Required'),
});

export const usersDefaultValues = {
  userType: '',
  organizationName: '',
  product: '',
  createdDate: null,
};

export const usersFilterArray = [
  {
    title: 'User Type',
    componentProps: {
      name: 'userType',
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
    title: 'Organization Name',
    componentProps: {
      name: 'organizationName',
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
    title: 'Product',
    componentProps: {
      name: 'product',
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
    title: 'Created Date',
    componentProps: {
      name: 'createdDate',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
];
