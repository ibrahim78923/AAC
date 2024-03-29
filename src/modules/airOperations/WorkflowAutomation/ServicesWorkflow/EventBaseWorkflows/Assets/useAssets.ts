import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { ACTIONS_TYPES, MODULES, SCHEMA_KEYS } from '@/constants/strings';
import { useLazyGetWorkflowListQuery } from '@/services/airOperations/workflow-automation/sales-workflow';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants';
import {
  EventBaseWorkflowActionsDropdown,
  listsColumnsFunction,
} from '../EventBaseWorkflow.data';

export const useAssets = () => {
  const theme = useTheme();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [selectedAction, setSelectedAction] = useState([]);
  const [deleteWorkflow, setDeleteWorkflow] = useState(false);
  const EDIT_WORKFLOW = 'edit';
  const selectedId = selectedAction?.map((item: any) => item?._id);
  const [getWorkflowListTrigger, { data, isLoading, isFetching, isSuccess }] =
    useLazyGetWorkflowListQuery();
  const workflowParams = {
    page,
    limit,
    search,
    module: SCHEMA_KEYS?.ASSETS,
    type: MODULES?.EVENT_BASE,
  };
  const handleWorkflow = async () => {
    await getWorkflowListTrigger(workflowParams);
  };
  useEffect(() => {
    handleWorkflow();
  }, [page, search, limit]);
  const onSubmitListFilter = async (filterData: any) => {
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
  const assetsData = data?.data;
  const listData = data?.data?.workFlows;
  const assetsListsColumns = listsColumnsFunction(
    selectedAction,
    setSelectedAction,
    listData,
    theme,
  );
  const handleActionClick = (actionType: string) => {
    if (actionType === ACTIONS_TYPES?.DELETE) {
      setDeleteWorkflow(true);
    } else if (actionType === ACTIONS_TYPES?.EDIT) {
      router?.push({
        pathname: AIR_OPERATIONS?.UPSERT_EVENT_BASED_WORKFLOW,
        query: {
          action: EDIT_WORKFLOW,
          id: selectedId,
        },
      });
    }
  };
  const dropdownOptions = EventBaseWorkflowActionsDropdown(handleActionClick);
  return {
    assetsListsColumns,
    selectedAction,
    listData,
    assetsData,
    isLoading,
    isSuccess,
    isFetching,
    setPage,
    limit,
    setLimit,
    setSearch,
    search,
    onSubmitListFilter,
    isDrawerOpen,
    setIsDrawerOpen,
    router,
    deleteWorkflow,
    setDeleteWorkflow,
    dropdownOptions,
    setSelectedAction,
  };
};
