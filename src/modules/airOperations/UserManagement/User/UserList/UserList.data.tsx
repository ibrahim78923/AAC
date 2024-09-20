import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { AntSwitch } from '@/components/AntSwitch';
import { PRODUCT_USER_STATUS } from '@/constants/strings';
import {
  fullName,
  fullNameInitial,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';
import { Avatar, Box, Checkbox, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { UserTableRowI } from '../User.interface';

export const operationUsersListColumnsDynamic = (
  selectedUserList: any,
  setSelectedUserList: Dispatch<SetStateAction<any>>,
  totalUsers = [],
  changeOperationUserStatus?: (e: any, id: string) => Promise<void>,
  changeSingleUserStatusStatus?: any,
  setSingleUserDetail?: (param: any) => void,
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
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        gap={1}
        onClick={() => setSingleUserDetail?.(info?.row?.original)}
        sx={{ cursor: 'pointer' }}
      >
        <Avatar
          sx={{ bgcolor: 'blue.main', width: 28, height: 28 }}
          src={generateImage(info?.getValue()?.avatar?.url)}
        >
          <Typography variant="body2" textTransform={'uppercase'}>
            {fullNameInitial(
              info?.getValue()?.firstName,
              info?.getValue()?.lastName,
            )}
          </Typography>
        </Avatar>
        {fullName(info?.getValue()?.firstName, info?.getValue()?.lastName)}
      </Box>
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
    accessorFn: (row: UserTableRowI) => row?.team,
    id: 'team',
    isSortable: true,
    header: 'Team',
    cell: (info: any) => truncateText(info?.getValue()?.name ?? '---'),
  },
  {
    accessorFn: (row: UserTableRowI) => row?.role,
    id: 'role',
    isSortable: true,
    header: 'Role',
    cell: (info: any) => truncateText(info?.getValue()?.name ?? '---'),
  },
  {
    accessorFn: (row: UserTableRowI) => row?.status,
    id: 'status',
    header: 'Status',
    cell: (info: any) => (
      <AntSwitch
        checked={info?.getValue() === PRODUCT_USER_STATUS?.ACTIVE}
        onChange={(e: any) =>
          changeOperationUserStatus?.(e, info?.row?.original?._id)
        }
        isLoading={
          changeSingleUserStatusStatus?.isLoading &&
          changeSingleUserStatusStatus?.originalArgs?.pathParams?.id ===
            info?.row?.original?._id
        }
        disabled={changeSingleUserStatusStatus?.isLoading}
      />
    ),
  },
];
