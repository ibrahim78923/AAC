import {
  Avatar,
  AvatarGroup,
  Box,
  Typography,
  useTheme,
  Checkbox,
} from '@mui/material';
import RHFSelect from '@/components/ReactHookForm/RHFSelect';
import RHFDatePicker from '@/components/ReactHookForm/RHFDatePicker';
import { SwitchBtn } from '@/components/SwitchButton';
import { AvatarImage } from '@/assets/images';
import { style } from './Users.style';
import useUserManagement from '../useUserManagement';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { DATE_FORMAT } from '@/constants';
import { IMG_URL } from '@/config';

export const columns: any = (columnsProps: any) => {
  const { handleUserSwitchChange, checkedRows, setCheckedRows } = columnsProps;
  const theme = useTheme();
  const handleCheckboxChange = (val: any, rowId: string) => {
    val?.target?.checked ? setCheckedRows(rowId) : setCheckedRows();
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
          onChange={(e: any) =>
            handleCheckboxChange(e, info?.row?.original?._id)
          }
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
              {info?.row?.original?.email ?? 'N/A'}
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
      cell: (info: any) =>
        info?.row?.original?.products?.length ? (
          <AvatarGroup max={4} sx={style?.avatarStyle(theme)}>
            {info?.row?.original?.products?.map((item: any) => (
              <Avatar
                key={uuidv4()}
                variant="square"
                alt="product-avatar"
                src={`${IMG_URL}${item?.logo?.url}`}
              >
                {/* {item?.name?.charAt(0, 1)} */}
              </Avatar>
            ))}
          </AvatarGroup>
        ) : (
          'N/A'
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
        dayjs(info?.row?.original?.createdAt).format(DATE_FORMAT?.UI) ?? 'N/A',
    },
  ];
};

export const superAdminColumns: any = (columnsProps: any) => {
  const { handleUserSwitchChange, checkedRows, setCheckedRows } = columnsProps;

  const handleCheckboxChange = (val: any, rowId: string) => {
    val?.target?.checked ? setCheckedRows(rowId) : setCheckedRows();
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
          onChange={(e: any) =>
            handleCheckboxChange(e, info?.row?.original?._id)
          }
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
              {info?.row?.original?.email ?? 'N/A'}
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
        dayjs(info?.row?.original?.createdAt).format(DATE_FORMAT?.UI),
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
