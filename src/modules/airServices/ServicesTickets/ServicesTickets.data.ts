import {
  TICKET_IMPACT,
  TICKET_PRIORITY,
  TICKET_STATUS,
  TICKET_TYPES,
} from '@/constants/strings';

export const ticketStatusOptions = [
  {
    value: TICKET_STATUS?.OPEN,
    label: 'Open',
  },
  {
    value: TICKET_STATUS?.PENDING,
    label: 'Pending',
  },
  {
    value: TICKET_STATUS?.RESOLVED,
    label: 'Resolved',
  },
  {
    value: TICKET_STATUS?.CLOSED,
    label: 'Closed',
  },
];

export const ticketPriorityOptions = [
  {
    value: TICKET_PRIORITY?.LOW,
    label: 'Low',
  },
  {
    value: TICKET_PRIORITY?.MEDIUM,
    label: 'Medium',
  },
  {
    value: TICKET_PRIORITY?.HIGH,
    label: 'High',
  },
  {
    value: TICKET_PRIORITY?.URGENT,
    label: 'Urgent',
  },
];

export const ticketImpactOptions = [
  {
    value: TICKET_IMPACT?.LOW,
    label: 'Low',
  },
  {
    value: TICKET_IMPACT?.MEDIUM,
    label: 'Medium',
  },
  {
    value: TICKET_IMPACT?.HIGH,
    label: 'High',
  },
];

export const ticketSourceOptions = [
  { value: 'Phone No.', label: 'Phone No.' },
  { value: 'Email', label: 'Email' },
  { value: 'Portal', label: 'Portal' },
  { value: 'Chat', label: 'Chat' },
  { value: 'Walk Up', label: 'Walk Up' },
  { value: 'Slack', label: 'Slack' },
  { value: 'MS Team', label: 'MS Team' },
];

export const ticketsTypeOptions = [
  {
    value: TICKET_TYPES?.ALL_TICKETS,
    label: 'All Tickets',
  },
  {
    value: TICKET_TYPES?.URGENT_AND_HIGH_PRIORITY,
    label: 'Urgent and High Priority',
  },
  {
    value: TICKET_TYPES?.MY_OPEN_AND_PENDING_TICKETS,
    label: 'My Open and Pending Tickets',
  },
  {
    value: TICKET_TYPES?.SPAM,
    label: 'Spam',
  },
  {
    value: TICKET_TYPES?.NEW_AND_MY_OPEN_TICKETS,
    label: 'New & My Open Tickets',
  },
  {
    value: TICKET_TYPES?.UNRESOLVED_TICKETS,
    label: 'All Unresolved Tickets',
  },
  {
    value: TICKET_TYPES?.INCIDENTS,
    label: 'Incidents',
  },
  {
    value: TICKET_TYPES?.SERVICE_REQUEST,
    label: 'Service Requests',
  },
  {
    value: TICKET_TYPES?.TICKETS_I_REQUESTED,
    label: 'Tickets I Requested',
  },
  {
    value: TICKET_TYPES?.SHARED_WITH_ME,
    label: 'Shared with me',
  },
];
