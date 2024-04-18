import { Avatar, Box, Checkbox, Typography } from '@mui/material';
import { AntSwitch } from '@/components/AntSwitch';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { REQUESTORS_STATUS } from '@/constants/strings';

export const userDropdown = (setDeleteModal: any) => [
  {
    id: 1,
    title: 'Delete',
    // permissionKey: [
    //   AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.ACTIVE_INACTIVE_USER,
    // ],
    handleClick: (close: any) => {
      setDeleteModal(true);
      close(null);
    },
  },
];

export const userList = (
  usersData: any = [],
  selectedUserList: any,
  setSelectedUserList: any,
  setIsDrawerOpen: any,
  setTabData: any,
  switchLoading: any,
  handleChangeStatus: any,
  router: any,
) => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        color="primary"
        name={info?.getValue()}
        checked={
          !!selectedUserList?.find(
            (item: any) => item?._id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedUserList([
                ...selectedUserList,
                usersData?.find((item: any) => item?._id === info?.getValue()),
              ])
            : setSelectedUserList(
                selectedUserList?.filter((item: any) => {
                  return item?._id !== info?.getValue();
                }),
              );
        }}
      />
    ),
    header: (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        color="primary"
        name="_id"
        checked={
          !!usersData?.length
            ? selectedUserList?.length === usersData?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedUserList([...usersData])
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
        <Avatar src={`url_for_avatar_${info?.row?.original?._id}`} alt="users">
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            sx={{
              color: 'blue.dull_blue',
              cursor: 'pointer',
            }}
            onClick={() => {
              setIsDrawerOpen(true);
              setTabData(info?.row?.original);
              router?.push({
                pathname: router?.pathname,
                query: { ...router?.query, userId: info?.row?.original?._id },
              });
            }}
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
    accessorFn: (row: any) => row?.user?.email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info: any) => info?.getValue() ?? '--',
  },
  {
    accessorFn: (row: any) => row?.team?.name,
    id: 'team',
    isSortable: true,
    header: 'Team',
    cell: (info: any) => info?.getValue() ?? '--',
  },
  {
    accessorFn: (row: any) => row?.user?.role,
    id: 'role',
    isSortable: true,
    header: 'Role',
    cell: (info: any) => info?.getValue() ?? '--',
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: false,
    header: 'Status',
    cell: (info: any) => {
      const getValues =
        info?.getValue() === REQUESTORS_STATUS?.ACTIVE ? true : false;
      return (
        <AntSwitch
          checked={getValues}
          isLoading={switchLoading?.[info?.row?.original?._id]}
          onClick={() => handleChangeStatus?.(info?.row?.original)}
        />
      );
    },
  },
];
