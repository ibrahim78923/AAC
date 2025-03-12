import { TICKET_GRAPH_TYPES } from '@/constants/services';

export const dropDownMenus = (setTicketType: any) => [
  {
    id: 1,
    title: 'Priority',
    handleClick: (closeMenu: any) => {
      setTicketType?.(TICKET_GRAPH_TYPES?.PRIORITY);
      closeMenu?.();
    },
  },
  {
    id: 2,
    title: 'Status',
    handleClick: (closeMenu: any) => {
      setTicketType?.(TICKET_GRAPH_TYPES?.STATUS);
      closeMenu?.();
    },
  },
];
