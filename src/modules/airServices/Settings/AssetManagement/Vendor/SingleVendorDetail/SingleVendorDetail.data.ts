export const singleVendorDetailsActionDropdownFunction = (
  setDeleteModalOpen: any,
  router: any,
) => [
  {
    title: 'Edit',
    handleClick: (closeMenu: any) => {
      router?.push({
        pathname: '',
        query: {
          ...router?.query,
          action: 'edit',
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
