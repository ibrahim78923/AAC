import { SingleDropdownButtonCloseMenuI } from '@/components/Buttons/SingleDropdownButton/SingleDropdownButton.interface';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { LOYALTY_PROGRAM_USERS_ACTIONS_CONSTANT } from '../User.data';
import { UpsertUser } from '../UpsertUser';
import { DeleteUser } from '../DeleteUser';
import { AIR_LOYALTY_PROGRAM_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { errorSnackbar } from '@/lib/snackbar';

const {
  ADD_LOYALTY_PROGRAM_USERS,
  EDIT_LOYALTY_PROGRAM_USERS,
  DELETE_LOYALTY_PROGRAM_USERS,
  LOYALTY_PROGRAM_USERS_DETAIL,
} = LOYALTY_PROGRAM_USERS_ACTIONS_CONSTANT;

export const loyaltyProgramUsersActionComponent = {
  [ADD_LOYALTY_PROGRAM_USERS]: <UpsertUser />,
  [EDIT_LOYALTY_PROGRAM_USERS]: <UpsertUser />,
  [DELETE_LOYALTY_PROGRAM_USERS]: <DeleteUser />,
  [LOYALTY_PROGRAM_USERS_DETAIL]: <UpsertUser />,
};

export const actionsDropdownForLoyaltyProgramUserDynamic = (
  setAction: (param: any) => void,
  selectedUserList: any,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [
      AIR_LOYALTY_PROGRAM_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.EDIT_OR_DELETE_USER,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      if (selectedUserList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setAction?.(EDIT_LOYALTY_PROGRAM_USERS);
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'View',
    permissionKey: [
      AIR_LOYALTY_PROGRAM_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.ADD_USER,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      if (selectedUserList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setAction?.(LOYALTY_PROGRAM_USERS_DETAIL);
      closeMenu();
    },
  },
  {
    id: 3,
    title: 'Delete',
    permissionKey: [
      AIR_LOYALTY_PROGRAM_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.EDIT_OR_DELETE_USER,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setAction(DELETE_LOYALTY_PROGRAM_USERS);
      closeMenu();
    },
  },
];
