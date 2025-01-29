import { SingleDropdownButtonCloseMenuI } from '@/components/Buttons/SingleDropdownButton/SingleDropdownButton.interface';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { AIR_SERVICES } from '@/constants/routes';
import { NextRouter } from 'next/router';

export const roleListActionDropdownDynamic = (
  setOpenDeleteModal?: any,
  router?: NextRouter,
  roleId?: string,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [
      AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.EDIT_ROLE,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      router?.push({
        pathname: AIR_SERVICES?.USER_UPSERT_ROLES_SETTINGS,
        query: { roleId },
      });
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [
      AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.DELETE_ROLE,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setOpenDeleteModal({ isOpen: true, roleId });
      closeMenu();
    },
  },
];
