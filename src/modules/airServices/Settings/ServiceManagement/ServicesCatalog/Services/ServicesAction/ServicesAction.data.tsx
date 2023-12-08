export const ServicesActionDropdownFunction = (
  setDeleteModalOpen: any,
  setOpen: any,
  setOpenStatus: any,
) => [
  {
    title: 'Move To Category',
    handleClick: (closeMenu: any) => {
      setOpen?.(true);
      closeMenu?.();
    },
  },
  {
    title: 'Change Status',
    handleClick: (closeMenu: any) => {
      setOpenStatus?.(true), closeMenu?.();
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
