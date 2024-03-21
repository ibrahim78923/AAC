import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const departmentActionDropdownFunction = (
  item?: any,
  setOpenUpsertModal?: any,
  setOpenDeleteModal?: any,
  setSelectedDepartment?: any,
) => [
  {
    id: 1,
    permissionKey: [
      AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.EDIT_DEPARTMENT,
    ],
    title: 'Edit',
    handleClick: (closeMenu: any) => {
      setOpenUpsertModal?.(true);
      setSelectedDepartment?.(item);
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
      setOpenDeleteModal?.(true);
      setSelectedDepartment?.(item);
      closeMenu?.();
    },
  },
];
