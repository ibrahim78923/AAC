import {
  Avatar,
  AvatarGroup,
  Box,
  Typography,
  useTheme,
  Checkbox,
  Tooltip,
} from '@mui/material';
import RHFDatePicker from '@/components/ReactHookForm/RHFDatePicker';
import { SwitchBtn } from '@/components/SwitchButton';
import { style } from './Users.style';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { DATE_FORMAT } from '@/constants';
import {
  useLazyGetOrganizationsListQuery,
  useLazyGetProductsListQuery,
} from '@/services/common-APIs';
import { RHFAutocompleteAsync } from '@/components/ReactHookForm';

export const columns: any = (columnsProps: any) => {
  const { handleUserSwitchChange, checkedRows, handleCheckboxChange } =
    columnsProps;
  const theme = useTheme();

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
          <Avatar
            alt="Remy Sharp"
            sx={{
              color: theme?.palette?.grey[600],
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            {info?.row?.original?.firstName?.charAt(0)?.toUpperCase()}
            {info?.row?.original?.lastName?.charAt(0)?.toUpperCase()}
          </Avatar>
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
      accessorFn: (row: any) => row?.organization,
      id: 'organizationName',
      isSortable: true,
      header: 'Organization Name',
      cell: (info: any) => info?.getValue()?.name ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.Products,
      id: 'products',
      isSortable: true,
      header: 'Products',
      cell: (info: any) =>
        info?.row?.original?.products?.length ? (
          <AvatarGroup max={4} sx={style?.avatarStyle(theme)}>
            <Tooltip
              placement="right"
              title={info?.row?.original?.products?.map((item: any) => (
                <Typography variant="body3" component="p" key={uuidv4()}>
                  {item?.name}
                </Typography>
              ))}
              arrow
            >
              <Avatar key={uuidv4()} variant="square" alt="product-avatar">
                {info?.row?.original?.products?.length}
              </Avatar>
            </Tooltip>
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
  const { handleUserSwitchChange, checkedRows, handleCheckboxChange } =
    columnsProps;
  const theme = useTheme();

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
          <Avatar
            alt="Remy Sharp"
            sx={{
              color: theme?.palette?.grey[600],
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            {info?.row?.original?.firstName?.charAt(0)?.toUpperCase()}
            {info?.row?.original?.lastName?.charAt(0)?.toUpperCase()}
          </Avatar>
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

export const usersFilterDefaultValues = (data: any) => {
  return {
    products: data?.products?.name ? data?.products : null,
    organization: data?.organization?.name ? data?.organization : null,
    role: '',
    createdDate: null,
  };
};

export const usersFilterArray = () => {
  const products = useLazyGetProductsListQuery();
  const organizations = useLazyGetOrganizationsListQuery();

  return [
    {
      componentProps: {
        name: 'organization',
        label: 'Organization Name',
        fullWidth: true,
        placeholder: 'Select organization',
        apiQuery: organizations,
        getOptionLabel: (option: any) => option?.name,
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        name: 'products',
        label: 'Product',
        fullWidth: true,
        placeholder: 'Select product',
        apiQuery: products,
        getOptionLabel: (option: any) => option?.name,
      },
      component: RHFAutocompleteAsync,
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
