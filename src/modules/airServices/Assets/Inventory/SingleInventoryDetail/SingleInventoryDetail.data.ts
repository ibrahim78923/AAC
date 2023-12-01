import { AIR_SERVICES } from '@/constants';

export const singleInventoryDetailActionDropdownFunction = (
  setDeleteModalOpen: any,
  router: any,
) => [
  {
    title: 'Edit',
    handleClick: (x: any) => {
      router?.push({
        pathname: AIR_SERVICES?.UPSERT_INVENTORY,
        query: {
          ...router?.query,
        },
      });
      x?.();
    },
  },
  {
    title: 'Delete',
    handleClick: (x: any) => {
      setDeleteModalOpen?.(true);
      x?.();
    },
  },
];
