import { useState } from 'react';
import { ticketsListData, ticketsListsColumnsFunction } from './Tickets.data';
import { useTheme } from '@mui/material';

export const useTickets = () => {
  const theme = useTheme();
  const [selectedTicketsList, setSelectedTicketsList] = useState([]);

  const ticketsListsColumns = ticketsListsColumnsFunction(
    selectedTicketsList,
    setSelectedTicketsList,
    ticketsListData,
    theme,
  );
  return {
    ticketsListsColumns,
    selectedTicketsList,
  };
};
