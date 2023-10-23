export const singlePurchaseDetailActionDropdownFunction = (
  setDeleteModalOpen: any,
  router: any,
) => [
  {
    title: 'Edit',
    handleClick: (x: any) => {
      router.push({
        pathname: `/air-services/assets/purchase-orders/new-purchase`,
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
