import { SingleDropdownButtonCloseMenuI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';
import {
  AIR_SERVICES_TICKETS_TICKET_LISTS,
  AIR_SERVICES_TICKETS_TICKETS_DETAILS,
} from '@/constants/permission-keys';
import { TICKETS_ACTION_CONSTANTS } from '../../TicketsLists.data';

export const STATUSES = {
  OPEN: 'OPEN',
  RESOLVED: 'RESOLVED',
  PENDING: 'PENDING',
  CLOSED: 'CLOSED',
};

export const ticketInfoCardAppearanceColor = (appearance: string) => {
  const New = 'new';
  const Overdue = 'Overdue';

  let color;

  switch (appearance) {
    case New:
      color = 'success';
      break;

    case Overdue:
      color = 'info';
      break;

    default:
      color = 'error';
      break;
  }
  return color;
};

export const ticketInfoCardPriorityColor = (priority: string) => {
  const Low = 'LOW';
  const Medium = 'MEDIUM';

  let color;

  switch (priority) {
    case Low:
      color = 'success';
      break;

    case Medium:
      color = 'warning';
      break;

    default:
      color = 'error';
      break;
  }
  return color;
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
