export const singleSoftwareDetailTabsData = [
  'Overview',
  'Installations',
  'Users',
  'Contracts',
];

export const singleSoftwareDropdown = [
  {
    title: 'Edit',
    handleClick: (closeMenu: () => void) => {
      closeMenu?.();
    },
  },
  {
    title: 'Delete',
    handleClick: (closeMenu: () => void) => {
      closeMenu?.();
    },
  },
];
