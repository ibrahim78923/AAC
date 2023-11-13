export const TICKET_STATUS = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  RESOLVED: 'RESOLVED',
  PENDING: 'PENDING',
};

export const TICKET_PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
};

export const TICKET_IMPACT = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
};

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
    value: TICKET_IMPACT?.MEDIUM,
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
