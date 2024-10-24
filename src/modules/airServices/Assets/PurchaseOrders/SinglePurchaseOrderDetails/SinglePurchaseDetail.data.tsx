import { AIR_SERVICES } from '@/constants/routes';
import { PURCHASE_ORDER_STATUS } from '@/constants/strings';

export const singlePurchaseDetailActionDropdownFunction = (
  setDeleteModalOpen: any,
  router: any,
) => [
  {
    id: 1,
    title: 'Edit',
    handleClick: (closeMenu: any) => {
      router?.push({
        pathname: AIR_SERVICES?.NEW_PURCHASE_ORDER,
        query: {
          ...router?.query,
        },
      });
      closeMenu?.();
    },
  },
  {
    id: 2,
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
    id: 1,
    title: 'Ordered',
    handleClick: (closeMenu: any) => {
      handleSubmitForOrdered?.(PURCHASE_ORDER_STATUS?.ORDERED);
      closeMenu?.();
    },
  },
  {
    id: 2,
    title: 'Cancelled',
    handleClick: (closeMenu: any) => {
      handleSubmitForOrdered?.(PURCHASE_ORDER_STATUS?.CANCELLED);
      closeMenu?.();
    },
  },
];
