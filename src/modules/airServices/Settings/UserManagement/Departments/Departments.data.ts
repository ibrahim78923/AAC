import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const departmentActionDropdownFunction = (
  setIsPrintDrawerOpen?: any,
  setDeleteModalOpen?: any,
) => [
  {
    id: 1,
    permissionKey: [
      AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.EDIT_DEPARTMENT,
    ],
    title: 'Edit',
    handleClick: (closeMenu: any) => {
      setIsPrintDrawerOpen?.(true);
      closeMenu?.();
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [
      AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.DELETE_DEPARTMENT,
    ],
    handleClick: (closeMenu: any) => {
      setDeleteModalOpen?.(true);
      closeMenu?.();
    },
  },
];
