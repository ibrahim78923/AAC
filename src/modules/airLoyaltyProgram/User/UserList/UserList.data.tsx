import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { Checkbox } from '@mui/material';
import { UserTableRowI } from '../User.interface';
import { UpdateUserStatus } from '../UpdateUserStatus';
import { TruncateText } from '@/components/TruncateText';
import { UserInfo } from '@/components/UserInfo';

export const loyaltyProgramUsersListColumnsDynamic = (
  selectedUserList: any,
  setSelectedUserList: (user: any) => void,
  totalUsers = [],
) => [
  {
    accessorFn: (row: UserTableRowI) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!selectedUserList?.find(
            (item: any) => item?._id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedUserList([...selectedUserList, info?.row?.original])
            : setSelectedUserList(
                selectedUserList?.filter(
                  (item: any) => item?._id !== info?.getValue(),
                ),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          totalUsers?.length
            ? selectedUserList?.length === totalUsers?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedUserList(totalUsers?.map((item: any) => item))
            : setSelectedUserList([]);
        }}
        color="primary"
        name="id"
      />
    ),
  },
  {
    accessorFn: (row: UserTableRowI) => row?.user,
    id: 'user',
    isSortable: true,
    header: 'Name',
    cell: (info: any) => (
      <UserInfo
        name={fullName(info?.getValue()?.firstName, info?.getValue()?.lastName)}
        nameInitial={fullNameInitial(
          info?.getValue()?.firstName,
          info?.getValue()?.lastName,
        )}
        avatarSrc={info?.getValue()?.avatar?.url}
      />
    ),
  },
  {
    accessorFn: (row: UserTableRowI) => row?.user?.email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: UserTableRowI) => row?.role,
    id: 'role',
    isSortable: true,
    header: 'Role',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.name?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: UserTableRowI) => row?.status,
    id: 'status',
    header: 'Status',
    cell: (info: any) => (
      <UpdateUserStatus
        currentId={info?.row?.original?._id}
        currentStatus={info?.getValue()}
      />
    ),
  },
];
