import { AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS } from '@/constants/permission-keys';
import { SingleDropdownButtonCloseMenuI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { errorSnackbar } from '@/utils/api';
import { OPERATIONS_USERS_ACTIONS_CONSTANT } from '../User.data';
import { UpsertUser } from '../UpsertUser';
import { DeleteUser } from '../DeleteUser';

const {
  ADD_OPERATIONS_USERS,
  EDIT_OPERATIONS_USERS,
  DELETE_OPERATIONS_USERS,
  OPERATIONS_USERS_DETAIL,
} = OPERATIONS_USERS_ACTIONS_CONSTANT;

export const operationsUsersActionComponent = {
  [ADD_OPERATIONS_USERS]: <UpsertUser />,
  [EDIT_OPERATIONS_USERS]: <UpsertUser />,
  [DELETE_OPERATIONS_USERS]: <DeleteUser />,
  [OPERATIONS_USERS_DETAIL]: <UpsertUser />,
};

export const actionsDropdownForOperationUserDynamic = (
  setAction: (param: any) => void,
  selectedUserList: any,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [
      AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.EDIT_USER,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      if (selectedUserList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setAction?.(EDIT_OPERATIONS_USERS);
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'View',
    permissionKey: [
      AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.VIEW_USER_DETAIL,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      if (selectedUserList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setAction?.(OPERATIONS_USERS_DETAIL);
      closeMenu();
    },
  },
  {
    id: 3,
    title: 'Delete',
    permissionKey: [
      AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.DELETE_USER,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setAction(DELETE_OPERATIONS_USERS);
      closeMenu();
    },
  },
];
