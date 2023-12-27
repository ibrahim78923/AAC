export const dropDownMenus = (setIsBarChart: any) => [
  {
    title: 'Priority',
    handleClick: (closeMenu: any) => {
      setIsBarChart(false);
      closeMenu?.();
    },
  },
  {
    title: 'Status',
    handleClick: (closeMenu: any) => {
      setIsBarChart(true);
      closeMenu?.();
    },
  },
];
