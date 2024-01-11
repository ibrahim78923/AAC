import {
  Avatar,
  Box,
  Checkbox,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { UserListI } from './User.interface';
import { AvatarImage } from '@/assets/images';
import { AntSwitch } from '@/components/AntSwitch';

export const userDropdown = (setDeleteModal: any) => [
  {
    title: 'Delete',
    handleClick: (close: any) => {
      setDeleteModal(true);
      close(null);
    },
  },
];
export const userListData: UserListI[] = [
  {
    id: 1,
    name: `Olivia Rhye`,
    email: `Orcalo@airapple.co.uk`,
    team: `Alfa`,
    role: 'Sales manager',
    status: true,
    icon: AvatarImage,
  },
  {
    id: 2,
    name: `Olivia Rhye`,
    email: `Orcalo@airapple.co.uk`,
    team: `Orcalo`,
    role: 'Sales manager',
    status: false,
    icon: AvatarImage,
  },
  {
    id: 3,
    name: `Olivia Rhye`,
    email: `Orcalo@airapple.co.uk`,
    team: `Test`,
    role: 'Sales manager',
    status: true,
    icon: AvatarImage,
  },
];
export const userList: any = (
  selectedUserList: any,
  setSelectedUserList: any,
  setIsDrawerOpen: any,
) => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        color="primary"
        name={info?.getValue()}
        checked={
          !!selectedUserList?.find((item: any) => item?.id === info?.getValue())
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedUserList([
                ...selectedUserList,
                userListData?.find(
                  (item: any) => item?.id === info?.getValue(),
                ),
              ])
            : setSelectedUserList(
                selectedUserList?.filter((item: any) => {
                  return item?.id !== info?.getValue();
                }),
              );
        }}
      />
    ),
    header: (
      <Checkbox
        color="primary"
        name="id"
        checked={selectedUserList?.length === userListData?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedUserList([...userListData])
            : setSelectedUserList([]);
        }}
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    header: 'Name',
    isSortable: true,
    cell: (info: any) => (
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <Avatar
          src={info?.row?.original?.icon?.src}
          alt={info?.row?.original?.icon?.name}
        />{' '}
        <Typography
          sx={{
            color: 'blue.dull_blue',
            cursor: 'pointer',
          }}
          onClick={() => setIsDrawerOpen(info?.getValue(), true)}
        >
          {info?.getValue()}
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info: any) => {
      return (
        <Typography
          style={{
            textTransform: 'lowercase',
            cursor: 'pointer',
          }}
        >
          {info?.getValue()}
        </Typography>
      );
    },
  },
  {
    accessorFn: (row: any) => row?.team,
    id: 'team',
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
      >
        <MenuItem value="" style={{ borderBottom: 'none !important' }}>
          <em> {info?.row?.original?.team}</em>
        </MenuItem>
        <MenuItem value={info?.row?.original?.team}>
          {info?.row?.original?.team}
        </MenuItem>
        <MenuItem value={info?.row?.original?.team}>
          {info?.row?.original?.team}
        </MenuItem>
        <MenuItem value={info?.row?.original?.team}>
          {info?.row?.original?.team}
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
    cell: (info: any) => <AntSwitch values={info?.getValue()} />,
  },
];
