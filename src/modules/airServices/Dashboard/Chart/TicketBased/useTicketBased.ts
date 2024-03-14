import { useLazyGetTicketsGraphQuery } from '@/services/airServices/dashboard';
import { useEffect, useState } from 'react';
import { TICKET_GRAPH_TYPES } from '@/constants/strings';
import { dropDownMenus } from './TicketBased.data';

export const useTicketBased = () => {
  const [graphType, setGraphType] = useState<string>(
    TICKET_GRAPH_TYPES?.STATUS,
  );
  const options = dropDownMenus(setGraphType);
  const [getTicketGraphTrigger, { data: chartData, isLoading, isFetching }] =
    useLazyGetTicketsGraphQuery();
  const ticketGraphParams = new URLSearchParams();
  ticketGraphParams?.append('filterBy', graphType);
  useEffect(() => {
    const handleTicket = async () => {
      await getTicketGraphTrigger(ticketGraphParams);
    };
    handleTicket();
  }, [graphType]);
  return {
    options,
    chartData,
    graphType,
    isLoading,
    isFetching,
  };
};
