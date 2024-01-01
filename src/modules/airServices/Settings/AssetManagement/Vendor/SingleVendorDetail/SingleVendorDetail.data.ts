export const singleVendorDetailsActionDropdownFunction = (
  setDeleteModalOpen: any,
  router: any,
  setIsADrawerOpen: any,
) => [
  {
    title: 'Edit',
    handleClick: (closeMenu: any) => {
      setIsADrawerOpen?.(true);
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
