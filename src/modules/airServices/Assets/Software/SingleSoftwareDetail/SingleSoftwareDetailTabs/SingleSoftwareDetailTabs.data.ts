export const singleSoftwareDetailTabsData = [
  'Overview',
  'Installations',
  'Users',
  'Contracts',
];

export const singleSoftwareDropdown = [
  {
    title: 'Edit',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'Delete',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
];
