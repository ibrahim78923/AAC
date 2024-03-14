import { useLazyGetTicketsQuery } from '@/services/airServices/tickets';
import { buildQueryParams } from '@/utils/api';
import { neglectKeysInLoop } from '../../FilterTickets/FilterTickets.data';
import { useEffect, useState } from 'react';
import { PAGINATION } from '@/config';

export const useTicketsBoardView = ({ search, filterTicketLists }: any) => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const HEAD_STATUS = [
    { heading: 'Open', be: 'OPEN' },
    { heading: 'Resolved', be: 'RESOLVED' },
    { heading: 'Pending', be: 'PENDING' },
    { heading: 'Closed', be: 'CLOSED' },
  ];
  const [lazyGetTicketsTrigger, lazyGetTicketsStatus] =
    useLazyGetTicketsQuery();

  const getValueTicketsListData = async (currentPage = page) => {
    const additionalParams = [
      ['metaData', true + ''],
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search],
    ];
    const ticketsParam = buildQueryParams(
      additionalParams,
      filterTicketLists,
      neglectKeysInLoop,
    );
    const getTicketsParameter = {
      queryParams: ticketsParam,
    };
    try {
      await lazyGetTicketsTrigger(getTicketsParameter)?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getValueTicketsListData();
  }, [search, page, pageLimit, filterTicketLists]);

  return {
    HEAD_STATUS,
    lazyGetTicketsStatus,
    setPage,
    setPageLimit,
    getValueTicketsListData,
    page,
  };
};
