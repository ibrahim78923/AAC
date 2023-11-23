import { AIR_SERVICES } from '@/constants';

export const singleProductDetailActionDropdownFunction = (
  setDeleteModalOpen: any,
  router: any,
) => [
  {
    title: 'Edit Catalog',
    handleClick: (x: any) => {
      router?.push({
        pathname: AIR_SERVICES?.ADD_INVENTORY,
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
