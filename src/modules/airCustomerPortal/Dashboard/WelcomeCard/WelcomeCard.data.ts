export const TICKET_TYPE = {
  NEW: 'New',
  COMPLETED: 'Completed',
  PENDING: 'Pending',
  TOTAL: 'Total',
};

export const ticketsCountsDataDynamic = (data: any) => {
  return [
    {
      _id: 1,
      name: TICKET_TYPE?.NEW,
      count: data?.[TICKET_TYPE?.NEW],
      label: 'New Tickets',
      color: 'primary.main',
    },
    {
      _id: 2,
      name: TICKET_TYPE?.PENDING,
      count: data?.[TICKET_TYPE?.PENDING],
      label: 'Pending Tickets',
      color: 'warning.main',
    },
    {
      _id: 3,
      name: TICKET_TYPE?.COMPLETED,
      count: data?.[TICKET_TYPE?.COMPLETED],
      label: 'Completed Tickets',
      color: 'success.main',
    },
  ];
};
