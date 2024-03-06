export const headerDropdownFunction = (
  isPrintDrawerOpen: any,
  setISPrintDrawerOpen: any,
) => [
  {
    title: 'Print',
    handleClick: (closeMenu: any) => {
      setISPrintDrawerOpen?.(true);
      closeMenu?.();
    },
  },
  {
    title: 'Delete',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'Close',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
];
