import { AIR_SERVICES } from '@/constants';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';

export const singleInventoryDetailActionDropdownFunction = (
  setDeleteModalOpen: any,
  router: any,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ADD_ASSETS,
    handleClick: (close: any) => {
      router?.push({
        pathname: AIR_SERVICES?.UPSERT_INVENTORY,
        query: {
          ...router?.query,
        },
      });
      close?.();
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.DELETE_ASSETS,
    handleClick: (close: any) => {
      setDeleteModalOpen?.(true);
      close?.();
    },
  },
];
