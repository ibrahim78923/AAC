import { Checkbox } from '@mui/material';

import { Avatar, AvatarGroup, Box, Typography } from '@mui/material';

import RHFSelect from '@/components/ReactHookForm/RHFSelect';

import RHFDatePicker from '@/components/ReactHookForm/RHFDatePicker';

import { SwitchBtn } from '@/components/SwitchButton';

import { AvatarImage } from '@/assets/images';

import dayjs from 'dayjs';
import * as Yup from 'yup';
import useUserManagement from '../useUserManagement';

export const columns: any = (columnsProps: any) => {
  const { handleUserSwitchChange, checkedRows, setCheckedRows } = columnsProps;

  const handleCheckboxChange = (rowId: string) => {
    setCheckedRows(rowId);
  };

  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          name={info?.getValue()}
          defaultChecked={checkedRows === info?.row?.original?._id}
          onChange={() => handleCheckboxChange(info?.row?.original?._id)}
        />
      ),
      header: <Checkbox color="primary" name="Id" disabled />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?._id,
      id: 'userId',
      header: 'User ID',
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
      header: 'User Type',
      cell: (info: any) => (
        <Typography>
          {info?.row?.original?.role?.toLowerCase()?.replace('_', ' ')}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.OrganizationName,
      id: 'organizationName',
      isSortable: true,
      header: 'Organization Name',
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
          defaultChecked={
            info?.row?.original?.status === 'ACTIVE' ? true : false
          }
          handleSwitchChange={(e: any) =>
            handleUserSwitchChange(e, info?.row?.original?._id)
          }
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdOn',
      isSortable: true,
      header: 'Created On',
      cell: (info: any) =>
        dayjs(info?.row?.original?.createdAt).format('DD/MM/YYYY'),
    },
  ];
};

export const superAdminColumns: any = (columnsProps: any) => {
  const { handleUserSwitchChange, checkedRows, setCheckedRows } = columnsProps;

  const handleCheckboxChange = (rowId: string) => {
    setCheckedRows(rowId);
  };
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          name={info?.getValue()}
          defaultChecked={checkedRows === info?.row?.original?._id}
          onChange={() => handleCheckboxChange(info?.row?.original?._id)}
        />
      ),
      header: <Checkbox color="primary" name="Id" disabled />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?._id,
      id: 'userId',
      header: 'User ID',
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
      header: 'User Type',
      cell: (info: any) => (
        <Typography>
          {info?.row?.original?.role?.toLowerCase()?.replace('_', ' ')}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.OrganizationName,
      id: 'organizationName',
      isSortable: true,
      header: 'Organization Name',
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
          defaultChecked={
            info?.row?.original?.status === 'ACTIVE' ? true : false
          }
          handleSwitchChange={(e: any) =>
            handleUserSwitchChange(e, info?.row?.original?._id)
          }
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.createdOn,
      id: 'createdOn',
      isSortable: true,
      header: 'Created On',
      cell: (info: any) =>
        dayjs(info?.row?.original?.createdAt).format('DD/MM/YYYY'),
    },
  ];
};

export const usersValidationSchema = Yup.object().shape({
  role: Yup.string(),
  organization: Yup.string(),
  products: Yup.string(),
});

export const usersDefaultValues = {
  role: '',
  organization: '',
  products: '',
  createdDate: null,
};

export const usersFilterArray = () => {
  const { products, organizations } = useUserManagement();

  return [
    {
      componentProps: {
        name: 'role',
        label: 'User Type',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'ORG_ADMIN', label: 'Company Owner' },
        { value: 'SUPER_ADMIN', label: 'Super Admin' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'organization',
        label: 'Organization Name',
        fullWidth: true,
        select: true,
      },
      options: organizations?.data?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'products',
        label: 'Product',
        fullWidth: true,
        select: true,
      },
      options: products?.data?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
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
};
