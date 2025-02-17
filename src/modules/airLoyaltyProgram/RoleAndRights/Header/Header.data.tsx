import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { LOYALTY_PROGRAM_ROLE_AND_RIGHTS_ACTIONS_CONSTANT } from '../RolesAndRight.data';
import { AIR_LOYALTY_PROGRAM_SETTINGS_ROLES_AND_RIGHT_PERMISSIONS } from '@/constants/permission-keys';
import dynamic from 'next/dynamic';

const DeleteRolesAndRight = dynamic(() => import('../DeleteRolesAndRight'), {
  ssr: false,
});

const UpsertRolesAndRight = dynamic(() => import('../UpsertRolesAndRight'), {
  ssr: false,
});

const {
  ADD_LOYALTY_PROGRAM_ROLE_AND_RIGHTS,
  EDIT_LOYALTY_PROGRAM_ROLE_AND_RIGHTS,
  DELETE_LOYALTY_PROGRAM_ROLE_AND_RIGHTS,
  LOYALTY_PROGRAM_ROLE_AND_RIGHTS_DETAIL,
} = LOYALTY_PROGRAM_ROLE_AND_RIGHTS_ACTIONS_CONSTANT ?? {};

export const loyaltyProgramRoleAndRightsActionComponent = {
  [ADD_LOYALTY_PROGRAM_ROLE_AND_RIGHTS]: <UpsertRolesAndRight />,
  [EDIT_LOYALTY_PROGRAM_ROLE_AND_RIGHTS]: <UpsertRolesAndRight />,
  [DELETE_LOYALTY_PROGRAM_ROLE_AND_RIGHTS]: <DeleteRolesAndRight />,
  [LOYALTY_PROGRAM_ROLE_AND_RIGHTS_DETAIL]: <UpsertRolesAndRight />,
};

export const roleAndRightsActionDropdownDynamic = (
  setAction: (param: any) => void,
  selectedRolesList: any,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [
      AIR_LOYALTY_PROGRAM_SETTINGS_ROLES_AND_RIGHT_PERMISSIONS?.EDIT_OR_DELETE_ROLE,
    ],
    disabled: selectedRolesList?.length > SELECTED_ARRAY_LENGTH?.ONE,
    handleClick: (closeMenu: any) => {
      setAction?.(EDIT_LOYALTY_PROGRAM_ROLE_AND_RIGHTS);
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'View',
    hasNoPermission: true,
    disabled: selectedRolesList?.length > SELECTED_ARRAY_LENGTH?.ONE,
    handleClick: (closeMenu: any) => {
      setAction?.(LOYALTY_PROGRAM_ROLE_AND_RIGHTS_DETAIL);
      closeMenu();
    },
  },
  {
    id: 3,
    title: 'Delete',
    permissionKey: [
      AIR_LOYALTY_PROGRAM_SETTINGS_ROLES_AND_RIGHT_PERMISSIONS?.EDIT_OR_DELETE_ROLE,
    ],
    disabled: selectedRolesList?.length > SELECTED_ARRAY_LENGTH?.ONE,
    handleClick: (closeMenu: any) => {
      setAction?.(DELETE_LOYALTY_PROGRAM_ROLE_AND_RIGHTS);
      closeMenu();
    },
  },
];
