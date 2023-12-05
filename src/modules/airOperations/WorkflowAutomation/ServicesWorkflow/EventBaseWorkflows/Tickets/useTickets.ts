import { useState } from 'react';
import { ticketsListData, ticketsListsColumnsFunction } from './Tickets.data';

export const useTickets = () => {
  const [selectedTicketsList, setSelectedTicketsList] = useState([]);

  const ticketsListsColumns = ticketsListsColumnsFunction(
    selectedTicketsList,
    setSelectedTicketsList,
    ticketsListData,
  );
  return {
    ticketsListsColumns,
    selectedTicketsList,
  };
};
