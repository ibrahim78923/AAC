import { SingleDropdownButtonCloseMenuI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { Dispatch, SetStateAction } from 'react';

export const dropdownAnnouncementsOptionsDynamic = (
  setIsPortalOpen: Dispatch<SetStateAction<any>>,
  data: any,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_MANAGE_DASHBOARD],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
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
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_MANAGE_DASHBOARD],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setIsPortalOpen({
        isOpen: true,
        isDelete: true,
        data,
      });
      closeMenu();
    },
  },
];
