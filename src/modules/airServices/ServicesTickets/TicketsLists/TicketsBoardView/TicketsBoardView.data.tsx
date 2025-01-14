import { SingleDropdownButtonCloseMenuI } from '@/components/Buttons/SingleDropdownButton/SingleDropdownButton.interface';
import {
  AIR_SERVICES_TICKETS_TICKET_LISTS,
  AIR_SERVICES_TICKETS_TICKETS_DETAILS,
} from '@/constants/permission-keys';
import { TICKETS_ACTION_CONSTANTS } from '../TicketsListHeader/TicketListHeader.data';

export const TICKET_DUE_DATE_MESSAGES = {
  DUE_UNTIL: 'Is Due Until',
  DUE_TILL: 'Was Due Till',
};

export const singleTicketBoardViewDropdownOptionsDynamic = (
  setTicketAction: any,
  detail?: any,
) => {
  return [
    {
      id: 1,
      permissionKey: [
        AIR_SERVICES_TICKETS_TICKETS_DETAILS?.UPDATE_INFO_EDIT_TICKET_DETAILS,
      ],
      title: 'Edit',
      handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
        setTicketAction(TICKETS_ACTION_CONSTANTS?.EDIT_TICKET, detail);
        closeMenu?.();
      },
    },
    {
      id: 2,
      title: 'Delete',
      permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS],
      handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
        setTicketAction(TICKETS_ACTION_CONSTANTS?.DELETE_TICKET, detail);
        closeMenu?.();
      },
    },
  ];
};

export const RENDER_COLOR: any = {
  Resolved: 'warning.main',
  Pending: 'error.main',
  Closed: 'success.main',
  Open: 'info.main',
  new: 'success.main',
  Overdue: 'info.main',
  LOW: 'success',
  MEDIUM: 'warning',
};
