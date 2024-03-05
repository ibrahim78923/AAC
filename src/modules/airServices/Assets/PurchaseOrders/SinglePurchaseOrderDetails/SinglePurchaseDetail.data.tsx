import { AIR_SERVICES } from '@/constants';

export const singlePurchaseDetailActionDropdownFunction = (
  setDeleteModalOpen: any,
  router: any,
) => [
  {
    title: 'Edit',
    handleClick: (closeMenu: any) => {
      router.push({
        pathname: AIR_SERVICES?.NEW_PURCHASE_ORDER,
        query: {
          ...router?.query,
        },
      });
      closeMenu?.();
    },
  },
  {
    title: 'Delete',
    handleClick: (closeMenu: any) => {
      setDeleteModalOpen?.(true);
      closeMenu?.();
    },
  },
];

export const singlePurchaseDetailStatusDropdownFunction = (
  handleSubmitForOrdered: any,
) => [
  {
    title: 'Ordered',
    handleClick: (closeMenu: any) => {
      handleSubmitForOrdered?.();
      closeMenu?.();
    },
  },
  {
    title: 'Cancelled',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
];
