import { SOFTWARE_USER_ACTIONS_TYPES } from '@/constants/strings';
import { AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS } from '@/constants/permission-keys';

export const userDropdown = (
  setActionModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  userActionClickHandler: (action: string) => void,
) => {
  return [
    {
      id: 1,
      permissionKey: [AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.USERS],
      title: SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE,
      handleClick: (closeMenu: () => void) => {
        userActionClickHandler(SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE);
        closeMenu?.();
      },
    },
    {
      id: 2,
      permissionKey: [AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.USERS],
      title: SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE,
      handleClick: (closeMenu: () => void) => {
        userActionClickHandler(SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE);
        closeMenu?.();
      },
    },
    {
      id: 3,
      permissionKey: [AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.USERS],
      title: SOFTWARE_USER_ACTIONS_TYPES?.REMOVE,
      handleClick: (closeMenu: () => void) => {
        userActionClickHandler(SOFTWARE_USER_ACTIONS_TYPES?.REMOVE);
        setActionModalOpen(true);
        closeMenu?.();
      },
    },
  ];
};
