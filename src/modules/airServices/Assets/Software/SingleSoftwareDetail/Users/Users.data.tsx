export const userDropdown = (setActionModalOpen: any) => {
  return [
    {
      title: 'Allocate',
      handleClick: () => setActionModalOpen(true),
    },
    {
      title: 'Deallocate',
      handleClick: () => setActionModalOpen(true),
    },
    {
      title: 'Remove',
      handleClick: () => setActionModalOpen(true),
    },
  ];
};
