import { SingleDropdownButtonCloseMenuI } from '@/components/Buttons/SingleDropdownButton/SingleDropdownButton.interface';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { LOYALTY_PROGRAM_USERS_ACTIONS_CONSTANT } from '../User.data';
import dynamic from 'next/dynamic';
import { AIR_LOYALTY_PROGRAM_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

const DeleteUser = dynamic(() => import('../DeleteUser'), {
  ssr: false,
});

const UpsertUser = dynamic(() => import('../UpsertUser'), {
  ssr: false,
});

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
    disabled: selectedUserList?.length > SELECTED_ARRAY_LENGTH?.ONE,
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setAction?.(EDIT_LOYALTY_PROGRAM_USERS);
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'View',
    hasNoPermission: true,
    disabled: selectedUserList?.length > SELECTED_ARRAY_LENGTH?.ONE,
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
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
