import { Avatar, Box, Checkbox, Typography } from '@mui/material';
import { AntSwitch } from '@/components/AntSwitch';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';

export const userDropdown = (setDeleteModal: any) => [
  {
    id: 1,
    title: 'Delete',
    handleClick: (close: any) => {
      setDeleteModal(true);
      close(null);
    },
  },
];

export const userList = (
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
    accessorFn: (row: any) => row?.user?.firstName,
    id: 'firstName',
    header: 'Name',
    isSortable: true,
    cell: (info: any) => (
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <Avatar src={`url_for_avatar_${info.row.original._id}`} alt="users">
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            sx={{
              color: 'blue.dull_blue',
              cursor: 'pointer',
            }}
            onClick={() => setIsDrawerOpen(info.getValue(), true)}
          >
            {fullNameInitial(
              info?.row?.original?.user?.firstName,
              info?.row?.original?.user?.lastName,
            )}
          </Typography>
        </Avatar>
        {fullName(
          info?.row?.original?.user?.firstName,
          info?.row?.original?.user?.lastName,
        )}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.team?.name,
    id: 'team',
    isSortable: true,
    header: 'Team',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.role?.name,
    id: 'role',
    isSortable: true,
    header: 'Role',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: false,
    header: 'Status',
    cell: (info: any) => <AntSwitch values={info?.getValue()} />,
  },
];
