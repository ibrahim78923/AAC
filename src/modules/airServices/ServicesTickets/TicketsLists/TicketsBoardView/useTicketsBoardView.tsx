import { useGetTicketsQuery } from '@/services/airServices/tickets';
import { buildQueryParams } from '@/utils/api';
import { neglectKeysInLoop } from '../../FilterTickets/FilterTickets.data';

export const useTicketsBoardView = ({ search, filterTicketLists }: any) => {
  const HEAD_STATUS = [
    { heading: 'Open', be: 'OPEN' },
    { heading: 'Resolved', be: 'RESOLVED' },
    { heading: 'Pending', be: 'PENDING' },
    { heading: 'Closed', be: 'CLOSED' },
  ];
  const additionalParams = [
    ['metaData', true + ''],
    ['limit', 500 + ''],
    ['search', search],
  ];
  const ticketsParam = buildQueryParams(
    additionalParams,
    filterTicketLists,
    neglectKeysInLoop,
  );
  const apiDataParameter = {
    queryParams: ticketsParam,
  };

  const { data, isLoading, isError, isFetching } = useGetTicketsQuery(
    apiDataParameter,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const ticketViewBoardArray = data?.data?.tickets;

  return {
    HEAD_STATUS,
    data,
    isLoading,
    isError,
    isFetching,
    ticketViewBoardArray,
  };
};
