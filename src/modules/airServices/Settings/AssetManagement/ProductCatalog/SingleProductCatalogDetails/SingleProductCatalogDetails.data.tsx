import { AIR_SERVICES } from '@/constants/routes';
import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const singleProductDetailActionDropdownFunction = (
  setDeleteModalOpen: any,
  router: any,
) => [
  {
    id: 1,
    permissionKey: [
      AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.EDIT_DELETE_PRODUCTS,
    ],
    title: 'Edit Product',
    handleClick: (closeMenu: any) => {
      router?.push({
        pathname: AIR_SERVICES?.UPSERT_PRODUCT_CATALOG,
        query: {
          ...router?.query,
        },
      });
      closeMenu?.();
    },
  },
  {
    id: 2,
    permissionKey: [
      AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.EDIT_DELETE_PRODUCTS,
    ],
    title: 'Delete',
    handleClick: (closeMenu: any) => {
      setDeleteModalOpen?.(true);
      closeMenu?.();
    },
  },
];
