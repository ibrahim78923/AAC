import { AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS } from '@/constants/permission-keys';
import { SingleDropdownButtonCloseMenuI } from '@/components/Buttons/SingleDropdownButton/SingleDropdownButton.interface';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { OPERATIONS_USERS_ACTIONS_CONSTANT } from '../User.data';
import dynamic from 'next/dynamic';
import LazyLoadingFlow from '@/components/LazyLoadingFlow';

const UpsertUser = dynamic(() => import('../UpsertUser'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="upsert user"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});
const DeleteUser = dynamic(() => import('../DeleteUser'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="delete user"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

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
    disabled: selectedUserList?.length > SELECTED_ARRAY_LENGTH?.ONE,
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
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
    disabled: selectedUserList?.length > SELECTED_ARRAY_LENGTH?.ONE,
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
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
