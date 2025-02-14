import {
  Avatar,
  AvatarGroup,
  Box,
  Typography,
  useTheme,
  Tooltip,
} from '@mui/material';
import { SwitchBtn } from '@/components/SwitchButton';
import dayjs from 'dayjs';
import { DATE_FORMAT, SUPER_ADMIN } from '@/constants';
import { v4 as uuidv4 } from 'uuid';
import { style } from '@/modules/superAdmin/UserManagement/Users/Users.style';
import Link from 'next/link';
import { capitalizeFirstLetter } from '@/utils/api';

export const usersColumns: any = (handleUserSwitchChange: any) => {
  const theme = useTheme();

  return [
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
            {capitalizeFirstLetter(info?.row?.original?.firstName?.charAt(0))}
            {capitalizeFirstLetter(info?.row?.original?.lastName?.charAt(0))}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component={'span'}>
              {`${capitalizeFirstLetter(
                info?.row?.original?.firstName,
              )} ${capitalizeFirstLetter(info?.row?.original?.lastName)}`}
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
      header: 'Organisation Name',
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
    {
      accessorFn: (row: any) => row?.viewDetails,
      id: 'viewDetails',
      isSortable: true,
      header: 'View Details',
      cell: () => (
        <Typography
          variant="body2"
          sx={{
            '&.MuiTypography-root:hover': {
              color: theme?.palette?.primary?.main,
            },
          }}
        >
          <Link href={SUPER_ADMIN?.USERMANAGMENT}>View Users</Link>
        </Typography>
      ),
    },
  ];
};
