import { SingleDropdownButtonCloseMenuI } from '@/components/Buttons/SingleDropdownButton/SingleDropdownButton.interface';
import { AIR_SERVICES_TICKETS_TICKET_LISTS } from '@/constants/permission-keys';
import { TICKET_STATUS } from '@/constants/strings';
import { TICKETS_ACTION_CONSTANTS } from '../../TicketsLists/TicketsListHeader/TicketListHeader.data';

export const singleTicketDetailDropdownOptionsDynamic = (
  setTicketAction: any,
) => [
  {
    id: 1,
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS],
    title: 'Print',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setTicketAction?.(TICKETS_ACTION_CONSTANTS?.PRINT_TICKET);
      closeMenu?.();
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setTicketAction?.(TICKETS_ACTION_CONSTANTS?.DELETE_TICKET);
      closeMenu?.();
    },
  },
  {
    id: 3,
    title: 'Close',
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setTicketAction?.(
        TICKETS_ACTION_CONSTANTS?.UPDATE_TICKET_STATUS,
        TICKET_STATUS?.CLOSED,
      );
      closeMenu?.();
    },
  },
];
