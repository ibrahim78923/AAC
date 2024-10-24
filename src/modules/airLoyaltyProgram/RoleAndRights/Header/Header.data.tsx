import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { UpsertRolesAndRight } from '../UpsertRolesAndRight';
import { LOYALTY_PROGRAM_ROLE_AND_RIGHTS_ACTIONS_CONSTANT } from '../RolesAndRight.data';
import { DeleteRolesAndRight } from '../DeleteRolesAndRight';
import { AIR_LOYALTY_PROGRAM_SETTINGS_ROLES_AND_RIGHT_PERMISSIONS } from '@/constants/permission-keys';
import { errorSnackbar } from '@/lib/snackbar';

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
    handleClick: (closeMenu: any) => {
      if (selectedRolesList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setAction?.(EDIT_LOYALTY_PROGRAM_ROLE_AND_RIGHTS);
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'View',
    permissionKey: [
      AIR_LOYALTY_PROGRAM_SETTINGS_ROLES_AND_RIGHT_PERMISSIONS?.ADD_ROLE,
    ],
    handleClick: (closeMenu: any) => {
      if (selectedRolesList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
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
    handleClick: (closeMenu: any) => {
      if (selectedRolesList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setAction?.(DELETE_LOYALTY_PROGRAM_ROLE_AND_RIGHTS);
      closeMenu();
    },
  },
];
