import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { AntSwitch } from '@/components/AntSwitch';
import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS } from '@/constants/permission-keys';
import {
  PRODUCT_USER_STATUS,
  SELECTED_ARRAY_LENGTH,
} from '@/constants/strings';
import { errorSnackbar } from '@/utils/api';
import { fullName, fullNameInitial, generateImage } from '@/utils/avatarUtils';
import { Avatar, Box, Checkbox, Typography } from '@mui/material';

export const actionsForLoyaltyUserDynamic = (
  setIsPortalOpen: any,
  selectedUserList: any,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [
      AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.EDIT_ARTICLE,
    ],
    handleClick: (closeMenu: any) => {
      if (selectedUserList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setIsPortalOpen?.({
        isEdit: true,
        isUpsert: true,
        isOpen: true,
      });
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'View',
    permissionKey: [
      AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.MOVE_FOLDER,
    ],
    handleClick: (closeMenu: any) => {
      if (selectedUserList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setIsPortalOpen?.({
        isOpen: true,
        isUpsert: true,
        isView: true,
      });
      closeMenu();
    },
  },
  {
    id: 3,
    title: 'Delete',
    permissionKey: [],
    handleClick: (closeMenu: any) => {
      if (selectedUserList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setIsPortalOpen({ isOpen: true, isDelete: true });
      closeMenu();
    },
  },
];

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
            ? setSelectedUserList(totalUsers?.map((item: any) => item?._id))
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
