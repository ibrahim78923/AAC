import { AIR_CUSTOMER_PORTAL_TICKETS_PERMISSIONS } from '@/constants/permission-keys';
import { TICKET_STATUS } from '@/constants/strings';

export const ticketStatuses = [
  TICKET_STATUS?.CLOSED,
  TICKET_STATUS?.OPEN,
  TICKET_STATUS?.PENDING,
  TICKET_STATUS?.RESOLVED,
  TICKET_STATUS?.SPAM,
];

export const allTicketsDropdownFunction = (setTicketStatus: any) => [
  {
    id: 2342,
    permissionKey: [AIR_CUSTOMER_PORTAL_TICKETS_PERMISSIONS?.FILTERS],
    title: 'All tickets',
    handleClick: (closeMenu: any) => {
      setTicketStatus?.('All tickets');
      closeMenu?.();
    },
  },
  {
    id: 4367,
    permissionKey: [AIR_CUSTOMER_PORTAL_TICKETS_PERMISSIONS?.FILTERS],
    title: 'Open',
    handleClick: (closeMenu: any) => {
      setTicketStatus?.(TICKET_STATUS?.OPEN);
      closeMenu?.();
    },
  },
  {
    id: 5479,
    permissionKey: [AIR_CUSTOMER_PORTAL_TICKETS_PERMISSIONS?.FILTERS],
    title: 'Closed',
    handleClick: (closeMenu: any) => {
      setTicketStatus?.(TICKET_STATUS?.CLOSED);
      closeMenu?.();
    },
  },
  {
    id: 9086,
    permissionKey: [AIR_CUSTOMER_PORTAL_TICKETS_PERMISSIONS?.FILTERS],
    title: 'Resolved',
    handleClick: (closeMenu: any) => {
      setTicketStatus?.(TICKET_STATUS?.RESOLVED);
      closeMenu?.();
    },
  },
];

export const newTicketsDropdownFunction = [
  {
    title: 'Report an issue',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'request a Service',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
];
