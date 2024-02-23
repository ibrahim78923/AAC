export const TICKET_TYPE = {
  NEW: 'New',
  COMPLETED: 'Completed',
  PENDING: 'Pending',
  TOTAL: 'Total',
};

export const TICKET_TYPE_DETAIL: any = (data: any) => {
  return {
    [TICKET_TYPE?.NEW]: {
      label: 'New Tickets',
      count: data?.[1],
      color: 'primary.main',
    },
    [TICKET_TYPE?.PENDING]: {
      label: 'Pending Tickets',
      count: data?.[1],
      color: 'warning.main',
    },
    [TICKET_TYPE?.COMPLETED]: {
      label: 'Completed Tickets',
      count: data?.[1],
      color: 'success.main',
    },
    [TICKET_TYPE?.TOTAL]: {
      label: 'total Tickets',
      count: data?.[1],
      color: 'success.main',
    },
  };
};

export const totalSum = (data: any, totalCount: any) => {
  const count = TICKET_TYPE_DETAIL(data)?.[data?.[0]]?.count;
  const total = totalCount?.[TICKET_TYPE?.TOTAL];
  const percentage = Math.floor((count / total) * 100);
  return percentage;
};
