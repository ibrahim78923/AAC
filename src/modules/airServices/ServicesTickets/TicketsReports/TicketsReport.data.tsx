export const cardOptions = (data: any) => [
  { id: 1, label: 'Open Tickets', chipValue: data?.openTickets ?? 0 },
  { id: 2, label: 'Close Tickets', chipValue: data?.closedTickets ?? 0 },
  { id: 3, label: 'Over Due Tickets', chipValue: data?.overDueTickets ?? 0 },
  {
    id: 4,
    label: 'Unassigned Tickets',
    chipValue: data?.unassignedTickets ?? 0,
  },
  {
    id: 5,
    label: 'Resolved Tickets',
    chipValue: data?.resolvedTickets ?? 0,
  },
  { id: 6, label: 'Pending Tickets', chipValue: data?.pendingTickets ?? 0 },
];

export const standardMonthAbbreviations = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

export const statuses = [
  'openData',
  'closedData',
  'resolvedData',
  'pendingData',
  'unassignedData',
  'overdueData',
];

export const statusNames = [
  'New Tickets',
  'Close Tickets',
  'Resolved Tickets',
  'Pending Tickets',
  'Unassigned Tickets',
  'OverDue Tickets',
];
