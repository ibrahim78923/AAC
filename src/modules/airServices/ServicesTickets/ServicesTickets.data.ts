import {
  TICKET_CATEGORY,
  TICKET_IMPACT,
  TICKET_PRIORITY,
  TICKET_SOURCE,
  TICKET_STATUS,
  TICKET_TYPE,
  TICKET_TYPES,
} from '@/constants/strings';
import { AutocompleteOptionsDropdownI } from './ServicesTickets.interface';

export const ticketStatusOptions: AutocompleteOptionsDropdownI = [
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
  {
    _id: TICKET_STATUS?.SPAM,
    label: TICKET_STATUS?.SPAM,
  },
];
export const ticketDetailsStatusOptions: string[] = [
  TICKET_STATUS?.OPEN,
  TICKET_STATUS?.CLOSED,
  TICKET_STATUS?.PENDING,
  TICKET_STATUS?.RESOLVED,
  TICKET_STATUS?.SPAM,
];
export const ticketPriorityOptions: AutocompleteOptionsDropdownI = [
  {
    _id: TICKET_PRIORITY?.LOW,
    label: TICKET_PRIORITY?.LOW,
  },
  {
    _id: TICKET_PRIORITY?.MEDIUM,
    label: TICKET_PRIORITY?.MEDIUM,
  },
  {
    _id: TICKET_PRIORITY?.HIGH,
    label: TICKET_PRIORITY?.HIGH,
  },
  {
    _id: TICKET_PRIORITY?.URGENT,
    label: TICKET_PRIORITY?.URGENT,
  },
];

export const ticketImpactOptions: AutocompleteOptionsDropdownI = [
  {
    _id: TICKET_IMPACT?.LOW,
    label: TICKET_IMPACT?.LOW,
  },
  {
    _id: TICKET_IMPACT?.MEDIUM,
    label: TICKET_IMPACT?.MEDIUM,
  },
  {
    _id: TICKET_IMPACT?.HIGH,
    label: TICKET_IMPACT?.HIGH,
  },
];
export const ticketCategoryOptions: string[] = [
  TICKET_CATEGORY?.SOFTWARE,
  TICKET_CATEGORY?.HARDWARE,
  TICKET_CATEGORY?.NETWORK,
  TICKET_CATEGORY?.OFFICE_APPLICATION,
  TICKET_CATEGORY?.OFFICE_FURNITURE,
];
export const ticketTypeOptions: string[] = [TICKET_TYPE?.INC, TICKET_TYPE?.SR];
export const ticketsSourceOptions: string[] = [
  TICKET_SOURCE?.PHONE,
  TICKET_SOURCE?.EMAIL,
  TICKET_SOURCE?.PORTAL,
  TICKET_SOURCE?.CHAT,
];
export const ticketImpact: string[] = [
  TICKET_IMPACT?.LOW,
  TICKET_IMPACT?.MEDIUM,
  TICKET_IMPACT?.HIGH,
];

export const ticketSourceOptions: AutocompleteOptionsDropdownI = [
  {
    _id: TICKET_SOURCE?.PHONE,
    label: TICKET_SOURCE?.PHONE,
  },
  {
    _id: TICKET_SOURCE?.EMAIL,
    label: TICKET_SOURCE?.EMAIL,
  },
  {
    _id: TICKET_SOURCE?.PORTAL,
    label: TICKET_SOURCE?.PORTAL,
  },
  {
    _id: TICKET_SOURCE?.CHAT,
    label: TICKET_SOURCE?.CHAT,
  },
];

export const ticketsTypeOptions: AutocompleteOptionsDropdownI = [
  {
    _id: TICKET_TYPE?.INC,
    label: TICKET_TYPES?.INCIDENTS,
  },
  {
    _id: TICKET_TYPE?.SR,
    label: TICKET_TYPES?.SERVICE_REQUEST,
  },
];
