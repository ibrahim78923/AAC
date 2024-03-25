import { useEffect, useState } from 'react';
import { tasksListsColumnsFunction } from './Tasks.data';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { SCHEMA_KEYS } from '@/constants/strings';
import { useLazyGetWorkflowListQuery } from '@/services/airOperations/workflow-automation/sales-workflow';

export const useTasks = () => {
  const theme = useTheme();
  const [selectedTasksList, setSelectedTasksList] = useState([]);
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
    module: SCHEMA_KEYS?.TICKETS_TASKS,
  };
  const handleWorkflow = async () => {
    await getWorkflowListTrigger(workflowParams);
  };
  useEffect(() => {
    handleWorkflow();
  }, [page, search, limit]);
  const onSubmitTaskFilter = async (filterData: any) => {
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
    setPage,
    page,
    limit,
    setLimit,
    setSearch,
    search,
    onSubmitTaskFilter,
    isDrawerOpen,
    setIsDrawerOpen,
  };
};
