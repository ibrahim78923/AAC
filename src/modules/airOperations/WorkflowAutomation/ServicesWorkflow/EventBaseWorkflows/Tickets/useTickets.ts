import { useState } from 'react';
import { ticketsListsColumnsFunction } from './Tickets.data';
import { useTheme } from '@mui/material';
import { useGetWorkflowQuery } from '@/services/airOperations/workflow-automation/services-workflow';
import { PAGINATION } from '@/config';
import { SCHEMA_KEYS } from '@/constants/strings';

export const useTickets = () => {
  const theme = useTheme();
  const [selectedTicketsList, setSelectedTicketsList] = useState([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const queryParams = {
    page: page,
    limit: pageLimit,
    module: SCHEMA_KEYS?.TICKETS,
  };
  const { data, isLoading, isFetching, isSuccess } =
    useGetWorkflowQuery(queryParams);
  const ticketsData = data?.data;
  const ticketsListData = data?.data?.workFlows;
  const ticketsListsColumns = ticketsListsColumnsFunction({
    selectedTicketsList,
    setSelectedTicketsList,
    ticketsListData,
    theme,
  });
  return {
    ticketsListsColumns,
    selectedTicketsList,
    ticketsListData,
    isLoading,
    isSuccess,
    isFetching,
    setPageLimit,
    setPage,
    page,
    pageLimit,
    ticketsData,
  };
};
