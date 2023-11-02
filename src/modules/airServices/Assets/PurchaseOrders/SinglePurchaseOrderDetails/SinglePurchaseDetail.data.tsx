import { AIR_SERVICES } from '@/constants';

export const singlePurchaseDetailActionDropdownFunction = (
  setDeleteModalOpen: any,
  router: any,
) => [
  {
    title: 'Edit',
    handleClick: (x: any) => {
      router.push({
        pathname: AIR_SERVICES?.NEW_PURCHASE_ORDER,
        query: {
          ...router.query,
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

export const singlePurchaseDetailStatusDropdownFunction = () => [
  {
    title: 'Close',
    handleClick: (x: any) => {
      x?.();
    },
  },
  {
    title: 'Submit',
    handleClick: (x: any) => {
      x?.();
    },
  },
];
