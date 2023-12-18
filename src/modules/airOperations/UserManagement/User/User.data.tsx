import { Avatar, Box, Checkbox, Typography } from '@mui/material';
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
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.role,
    id: 'role',
    isSortable: true,
    header: 'Role',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => <AntSwitch values={info?.getValue()} />,
  },
];
