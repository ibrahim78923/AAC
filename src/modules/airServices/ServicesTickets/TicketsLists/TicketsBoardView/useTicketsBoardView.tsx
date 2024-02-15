import { useGetTicketsQuery } from '@/services/airServices/tickets';

export const useTicketsBoardView = ({ search }: any) => {
  const HEAD_STATUS = [
    { heading: 'Open', be: 'OPEN' },
    { heading: 'Resolved', be: 'RESOLVED' },
    { heading: 'Pending', be: 'PENDING' },
    { heading: 'Closed', be: 'CLOSED' },
  ];

  const apiDataParameter = {
    queryParams: { metaData: true, limit: 500, search: search },
  };

  const { data, isLoading, isError } = useGetTicketsQuery(apiDataParameter);

  const ticketViewBoardArray = data?.data?.tickets;

  return { HEAD_STATUS, data, isLoading, isError, ticketViewBoardArray };
};
