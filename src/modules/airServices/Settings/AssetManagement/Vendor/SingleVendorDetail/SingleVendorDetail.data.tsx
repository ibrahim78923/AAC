import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const singleVendorDetailsActionDropdownFunction = (
  setDeleteModalOpen: any,
  router: any,
  setIsADrawerOpen: any,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [
      AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.SEARCH_IMPORT_EXPORT_VENDORS,
    ],

    handleClick: (closeMenu: any) => {
      setIsADrawerOpen?.(true);
      closeMenu?.();
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [
      AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.SEARCH_IMPORT_EXPORT_VENDORS,
    ],

    handleClick: (closeMenu: any) => {
      setDeleteModalOpen?.(true);
      closeMenu?.();
    },
  },
];
