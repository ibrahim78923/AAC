export const ticketDashboardCardsData = (cardData: any) => [
  {
    _id: 1,
    color: 'secondary.main',
    count: cardData?.overDue ?? 0,
    label: 'Overdue',
  },
  {
    _id: 2,
    color: 'info.main',
    count: cardData?.dueToday ?? 0,
    label: 'Due Today',
  },
  {
    _id: 3,
    color: 'warning.main',
    count: cardData?.unResolved ?? 0,
    label: 'Unresolved',
  },
  {
    _id: 4,
    color: 'success.main',
    count: cardData?.onHold ?? 0,
    label: 'OnHold',
  },
  {
    _id: 5,
    color: 'primary.main',
    count: cardData?.openTicketsTotal ?? 0,
    label: 'Open Tickets',
  },
];
