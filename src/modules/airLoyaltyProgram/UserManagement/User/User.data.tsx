import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { AntSwitch } from '@/components/AntSwitch';
import { PRODUCT_USER_STATUS } from '@/constants/strings';
import { fullName, fullNameInitial, generateImage } from '@/utils/avatarUtils';
import { Avatar, Box, Checkbox, Typography } from '@mui/material';

export const loyaltyUsersColumnsDynamic = (
  selectedUserList?: any,
  setSelectedUserList?: any,
  totalUsers: any = [],
  changeLoyaltyUserStatus?: any,
  changeSingleUserStatusStatus?: any,
  setSingleUserDetail?: any,
) => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
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
            ? setSelectedUserList(
                totalUsers?.map((article: any) => article?._id),
              )
            : setSelectedUserList([]);
        }}
        color="primary"
        name="id"
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.user,
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
    accessorFn: (row: any) => row?.user?.email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info: any) => info?.getValue() ?? '--',
  },
  {
    accessorFn: (row: any) => row?.role,
    id: 'role',
    isSortable: true,
    header: 'Role',
    cell: (info: any) => info?.getValue()?.name ?? '--',
  },
  {
    accessorFn: (info: any) => info?.status,
    id: 'status',
    header: 'Status',
    cell: (info: any) => (
      <AntSwitch
        checked={info?.getValue() === PRODUCT_USER_STATUS?.ACTIVE}
        onChange={(e: any) =>
          changeLoyaltyUserStatus?.(e, info?.row?.original?._id)
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
