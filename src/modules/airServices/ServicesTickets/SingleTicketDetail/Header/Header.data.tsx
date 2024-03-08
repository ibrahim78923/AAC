import { AIR_SERVICES_TICKETS_TICKET_LISTS } from '@/constants/permission-keys';

export const headerDropdownFunction = (setIsPrintDrawerOpen: any) => [
  {
    id: 1,
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS],
    title: 'Print',
    handleClick: (closeMenu: any) => {
      setIsPrintDrawerOpen?.(true);
      closeMenu?.();
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS],
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    id: 3,
    title: 'Close',
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS],
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
];
