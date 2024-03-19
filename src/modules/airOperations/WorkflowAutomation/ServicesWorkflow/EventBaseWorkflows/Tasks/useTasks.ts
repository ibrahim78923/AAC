import { useState } from 'react';
import { tasksListsColumnsFunction } from './Tasks.data';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { useGetWorkflowQuery } from '@/services/airOperations/workflow-automation/services-workflow';
import { SCHEMA_KEYS } from '@/constants/strings';

export const useTasks = () => {
  const theme = useTheme();
  const [selectedTasksList, setSelectedTasksList] = useState([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const queryParams = {
    page: page,
    limit: pageLimit,
    module: SCHEMA_KEYS?.TICKETS_TASKS,
  };
  const { data, isLoading, isFetching, isSuccess } =
    useGetWorkflowQuery(queryParams);
  const taskData = data?.data;
  const taskListData = data?.data?.workFlows;
  const tasksListsColumns = tasksListsColumnsFunction(
    selectedTasksList,
    setSelectedTasksList,
    taskListData,
    theme,
  );
  return {
    selectedTasksList,
    tasksListsColumns,
    taskListData,
    taskData,
    isLoading,
    isSuccess,
    isFetching,
    setPageLimit,
    setPage,
    page,
    pageLimit,
  };
};
