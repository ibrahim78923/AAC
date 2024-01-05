import { SOFTWARE_USER_ACTIONS_TYPES } from '@/constants/strings';
import { UserActionI } from './Users.interface';

export const userDropdown = (
  setActionModalOpen: any,
  userActionClickHandler: any,
): UserActionI[] => {
  return [
    {
      title: SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE,
      handleClick: (closeMenu) => {
        userActionClickHandler(SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE);
        setActionModalOpen(true);
        closeMenu?.();
      },
    },
    {
      title: SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE,
      handleClick: (closeMenu) => {
        userActionClickHandler(SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE);
        setActionModalOpen(true);
        closeMenu?.();
      },
    },
    {
      title: SOFTWARE_USER_ACTIONS_TYPES?.REMOVE,
      handleClick: (closeMenu) => {
        userActionClickHandler(SOFTWARE_USER_ACTIONS_TYPES?.REMOVE);
        setActionModalOpen(true);
        closeMenu?.();
      },
    },
  ];
};
