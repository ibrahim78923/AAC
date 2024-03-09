import { AIR_SERVICES } from '@/constants';
import { AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS } from '@/constants/permission-keys';
import { PURCHASE_ORDER_STATUS } from '@/constants/strings';

export const singlePurchaseDetailActionDropdownFunction = (
  setDeleteModalOpen: any,
  router: any,
) => [
  {
    id: 1,
    permissionKey: [
      AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS?.NEW_PURCAHSE_ORDER,
    ],
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
    id: 2,
    permissionKey: [
      AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS?.VIEW_PURCAHSE_ORDER_DETAILS,
    ],
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
    permissionKey: [
      AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS?.VIEW_PURCAHSE_ORDER_DETAILS,
    ],
    title: 'Ordered',
    handleClick: (closeMenu: any) => {
      handleSubmitForOrdered?.(PURCHASE_ORDER_STATUS?.ORDERED);
      closeMenu?.();
    },
  },
  {
    id: 2,
    permissionKey: [
      AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS?.VIEW_PURCAHSE_ORDER_DETAILS,
    ],
    title: 'Cancelled',
    handleClick: (closeMenu: any) => {
      handleSubmitForOrdered?.(PURCHASE_ORDER_STATUS?.CANCELLED);
      closeMenu?.();
    },
  },
];
