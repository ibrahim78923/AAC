import { Dispatch, SetStateAction } from 'react';

export const softwareActionsOptions = (
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>,
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>,
) => [
  {
    id: 1,
    title: 'Edit',
    handleClick: (closeMenu: any) => {
      setIsDrawerOpen?.(true);
      closeMenu?.();
    },
  },
  {
    id: 2,
    title: 'Delete',
    handleClick: (closeMenu: any) => {
      setDeleteModalOpen?.(true);
      closeMenu?.();
    },
  },
];
