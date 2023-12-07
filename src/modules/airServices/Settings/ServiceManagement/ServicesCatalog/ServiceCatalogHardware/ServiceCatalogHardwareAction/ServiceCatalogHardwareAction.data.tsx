export const ServiceCatalogHardwareActionDropdownFunction = (
  setDeleteModalOpen: any,
) => [
  {
    title: 'Move To Category',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'Change Status',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'Visibility',
    handleClick: (closeMenu: any) => {
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
