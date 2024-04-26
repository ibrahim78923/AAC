import { AIR_SERVICES_TICKETS_TICKET_LISTS } from '@/constants/permission-keys';
import { TICKET_STATUS } from '@/constants/strings';

export const headerDropdownFunction = (
  setIsPrintDrawerOpen: any,
  updateTicketStatus: any,
  setDeleteModalOpen: any,
) => [
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
      setDeleteModalOpen?.(true);
      closeMenu?.();
    },
  },
  {
    id: 3,
    title: 'Close',
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS],
    handleClick: (closeMenu: any) => {
      updateTicketStatus?.(TICKET_STATUS?.CLOSED);
      closeMenu?.();
    },
  },
];
