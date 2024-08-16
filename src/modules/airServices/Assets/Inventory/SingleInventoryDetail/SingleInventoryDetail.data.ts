import { AIR_SERVICES } from '@/constants';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import { NextRouter } from 'next/router';

export const singleInventoryDetailActionDropdownFunction = (
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  router: NextRouter,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ADD_ASSETS],
    handleClick: (close: () => void) => {
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
    permissionKey: [AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.DELETE_ASSETS],
    handleClick: (close: () => void) => {
      setDeleteModalOpen?.(true);
      close?.();
    },
  },
];
