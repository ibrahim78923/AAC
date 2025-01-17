import { PublicSingleDropdownButtonCloseMenuI } from '@/components/Buttons/PublicSingleDropdownButton/PublicSingleDropdownButton.interface';
import { Dispatch, SetStateAction } from 'react';

export const dropdownAnnouncementsOptionsDynamic = (
  setIsPortalOpen: Dispatch<SetStateAction<any>>,
  data: any,
) => [
  {
    id: 1,
    title: 'Edit',
    handleClick: (closeMenu: PublicSingleDropdownButtonCloseMenuI) => {
      setIsPortalOpen({
        isOpen: true,
        isUpsert: true,
        data,
      });
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'Delete',
    handleClick: (closeMenu: PublicSingleDropdownButtonCloseMenuI) => {
      setIsPortalOpen({
        isOpen: true,
        isDelete: true,
        data,
      });
      closeMenu();
    },
  },
];
