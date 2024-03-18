import {
  Avatar,
  Box,
  Checkbox,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { AntSwitch } from '@/components/AntSwitch';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

export const userDropdown = (setDeleteModal: any) => [
  {
    id: 1,
    title: 'Delete',
    permissionKey: [
      AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.DELETE_USER,
    ],
    handleClick: (close: any) => {
      setDeleteModal(true);
      close(null);
    },
  },
];

export const userList: any = (
  userData: any = [],
  selectedUserList: any,
  setSelectedUserList: any,
  setIsDrawerOpen: any,
) => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        color="primary"
        name={info?.getValue()}
        checked={
          !!selectedUserList?.find((item: any) => item === info?.getValue())
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedUserList([...selectedUserList, info?.getValue()])
            : setSelectedUserList(
                selectedUserList?.filter(
                  (item: any) => item !== info?.getValue(),
                ),
              );
        }}
      />
    ),
    header: (
      <Checkbox
        color="primary"
        name="_id"
        checked={
          userData?.length
            ? selectedUserList?.length === userData?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedUserList(userData?.map((user: any) => user?._id))
            : setSelectedUserList([]);
        }}
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.firstName,
    id: 'firstName',
    header: 'Name',
    isSortable: true,
    cell: (info: any) => (
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <Avatar src={info?.row?.original?.icon?.src} alt="users">
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.VIEW_USER_DETAIL,
            ]}
          >
            <Typography
              variant="body2"
              textTransform={'uppercase'}
              sx={{
                color: 'blue.dull_blue',
                cursor: 'pointer',
              }}
              onClick={() => setIsDrawerOpen(info?.getValue(), true)}
            >
              {fullNameInitial(
                info?.row?.original?.firstName,
                info?.row?.original?.lastName,
              )}
            </Typography>
          </PermissionsGuard>
        </Avatar>
        {fullName(
          info?.row?.original?.firstName,
          info?.row?.original?.lastName,
        )}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.team,
    id: 'role',
    isSortable: true,
    header: 'Team',
    cell: (info: any) => (
      <Select
        variant="standard"
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={info.getValue() || ''}
        label="Select"
        name={info.getValue()}
        sx={{ borderBottom: 'none !important' }}
        MenuProps={{
          sx: {
            '& .MuiList-root': {
              '& .MuiMenuItem-root': { borderBottom: 'none !important' },
            },
          },
        }}
      >
        <MenuItem value="">
          <em>{info?.row?.original?.role}</em>
        </MenuItem>
        <MenuItem value={info?.row?.original?.role}>
          {info?.row?.original?.role}
        </MenuItem>
        <MenuItem value={info?.row?.original?.role}>
          {info?.row?.original?.role}
        </MenuItem>
        <MenuItem value={info?.row?.original?.role}>
          {info?.row?.original?.role}
        </MenuItem>
      </Select>
    ),
  },
  {
    accessorFn: (row: any) => row?.role,
    id: 'role',
    isSortable: true,
    header: 'Role',

    cell: (info: any) => (
      <Select
        variant="standard"
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={info.getValue() || ''}
        label="Select"
        name={info.getValue()}
        sx={{
          borderBottom: 'none !important',
          '& .MuiOutlinedInput-notchedOutline': {
            borderBottom: 'none !important',
          },
          '&:focus': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderBottom: 'none !important',
            },
          },
        }}
      >
        <MenuItem value="">
          <em>{info?.row?.original?.role}</em>
        </MenuItem>
        <MenuItem value={info?.row?.original?.role}>
          {info?.row?.original?.role}
        </MenuItem>
      </Select>
    ),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => (
      <PermissionsGuard
        permissions={[
          AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.ACTIVE_INACTIVE_USER,
        ]}
      >
        <AntSwitch values={info?.getValue()} />
      </PermissionsGuard>
    ),
  },
];
