import { useEffect, useState } from 'react';
import { ticketsListsColumnsFunction } from './Tickets.data';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { SCHEMA_KEYS } from '@/constants/strings';
import { useLazyGetWorkflowListQuery } from '@/services/airOperations/workflow-automation/sales-workflow';

export const useTickets = () => {
  const theme = useTheme();
  const [selectedTicketsList, setSelectedTicketsList] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [getWorkflowListTrigger, { data, isLoading, isFetching, isSuccess }] =
    useLazyGetWorkflowListQuery();
  const workflowParams = {
    page,
    limit,
    search,
    module: SCHEMA_KEYS?.TICKETS,
  };
  const handleWorkflow = async () => {
    await getWorkflowListTrigger(workflowParams);
  };
  useEffect(() => {
    handleWorkflow();
  }, [page, search, limit]);
  const onSubmitFilter = async (filterData: any) => {
    const filterParams: any = {
      ...workflowParams,
      createdBy: filterData?.createdBy?._id,
    };
    if (filterData?.status) {
      filterParams.status = filterData?.status;
    }
    await getWorkflowListTrigger(filterParams);
    setIsDrawerOpen?.(false);
  };
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
    setPage,
    page,
    ticketsData,
    limit,
    setLimit,
    setSearch,
    search,
    onSubmitFilter,
    isDrawerOpen,
    setIsDrawerOpen,
  };
};
