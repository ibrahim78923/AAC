import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { SOFTWARE_USER_PORTAL_ACTIONS_TYPES } from '../Users.data';

export const userActionDropdownDynamic = (
  setPortalActions: (action: string) => void,
  usersData: any,
) => {
  return [
    {
      id: 1,
      title: SOFTWARE_USER_PORTAL_ACTIONS_TYPES?.ALLOCATE,
      disabled: usersData?.length > SELECTED_ARRAY_LENGTH?.ONE,
      handleClick: (closeMenu: () => void) => {
        setPortalActions(SOFTWARE_USER_PORTAL_ACTIONS_TYPES?.ALLOCATE);
        closeMenu?.();
      },
    },
    {
      id: 2,
      title: SOFTWARE_USER_PORTAL_ACTIONS_TYPES?.DEALLOCATE,
      disabled: usersData?.length > SELECTED_ARRAY_LENGTH?.ONE,
      handleClick: (closeMenu: () => void) => {
        setPortalActions(SOFTWARE_USER_PORTAL_ACTIONS_TYPES?.DEALLOCATE);
        closeMenu?.();
      },
    },
    {
      id: 3,
      title: SOFTWARE_USER_PORTAL_ACTIONS_TYPES?.REMOVE,
      handleClick: (closeMenu: () => void) => {
        setPortalActions(SOFTWARE_USER_PORTAL_ACTIONS_TYPES?.REMOVE);
        closeMenu?.();
      },
    },
  ];
};
