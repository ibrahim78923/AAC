import {
  TICKET_IMPACT,
  TICKET_PRIORITY,
  TICKET_STATUS,
  TICKET_TYPE,
  TICKET_TYPES,
} from '@/constants/strings';

export const ticketStatusOptions = [
  {
    _id: TICKET_STATUS?.OPEN,
    label: TICKET_STATUS?.OPEN,
  },
  {
    _id: TICKET_STATUS?.PENDING,
    label: TICKET_STATUS?.PENDING,
  },
  {
    _id: TICKET_STATUS?.RESOLVED,
    label: TICKET_STATUS?.RESOLVED,
  },
  {
    _id: TICKET_STATUS?.CLOSED,
    label: TICKET_STATUS?.CLOSED,
  },
];
export const ticketDetailsStatusOptions = [
  TICKET_STATUS?.OPEN,
  TICKET_STATUS?.CLOSED,
  TICKET_STATUS?.PENDING,
  TICKET_STATUS?.RESOLVED,
  TICKET_STATUS?.SPAM,
];
export const ticketPriorityOptions = [
  TICKET_PRIORITY?.LOW,
  TICKET_PRIORITY?.MEDIUM,
  TICKET_PRIORITY?.HIGH,
  TICKET_PRIORITY?.URGENT,
];

export const ticketImpactOptions = [
  TICKET_IMPACT?.LOW,
  TICKET_IMPACT?.MEDIUM,
  TICKET_IMPACT?.HIGH,
];
export const ticketTypeOptions = [TICKET_TYPE.INC, TICKET_TYPE.SR];
export const ticketSourceOptions = ['PHONE', 'EMAIL', 'PORTAL', 'CHAT'];

//TODO: we will use if BE added these.
// export const ticketsTypeOptions = [
//   TICKET_TYPES?.ALL_TICKETS,
//   TICKET_TYPES?.URGENT_AND_HIGH_PRIORITY,
//   TICKET_TYPES?.OPEN_TICKETS_IN_MY_GROUP,
//   TICKET_TYPES?.MY_OVERDUE_TICKETS,
//   TICKET_TYPES?.MY_OPEN_AND_PENDING_TICKETS,
//   TICKET_TYPES?.SPAM_TICKETS,
//   TICKET_TYPES?.NEW_AND_MY_OPEN_TICKETS,
//   TICKET_TYPES?.UNRESOLVED_TICKETS,
//   TICKET_TYPES?.INCIDENTS,
//   TICKET_TYPES?.SERVICE_REQUEST,
//   TICKET_TYPES?.TICKETS_I_REQUESTED,
//   TICKET_TYPES?.SHARED_WITH_ME,
// ];

export const ticketsTypeOptions = [
  {
    _id: 'INC',
    label: TICKET_TYPES?.INCIDENTS,
  },
  {
    _id: 'SR',
    label: TICKET_TYPES?.SERVICE_REQUEST,
  },
];

export const makeDateTime = (date: any, time: any) => {
  const hour = time?.getHours() ?? date?.getHours();
  const minutes = time?.getMinutes() ?? date?.getMinutes();
  const year = date?.getFullYear() ?? time?.getFullYear();
  const month = date?.getMonth() ?? time?.getMonth();
  const day = date?.getDate() ?? time?.getDate();
  const combined: any = new Date(year, month, day, hour, minutes, 0);
  return combined;
};
