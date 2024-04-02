import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import {
  ACTIONS_TYPES,
  MODULES,
  REQUESTORS_STATUS,
  SCHEMA_KEYS,
} from '@/constants/strings';
import {
  useChangeStatusWorkflowMutation,
  useLazyGetWorkflowListQuery,
} from '@/services/airOperations/workflow-automation/sales-workflow';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants';
import {
  EventBaseWorkflowActionsDropdown,
  listsColumnsFunction,
} from '../EventBaseWorkflow.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useCloneServicesWorkflowMutation } from '@/services/airOperations/workflow-automation/services-workflow';

export const useAssets = () => {
  const theme = useTheme();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [selectedAction, setSelectedAction] = useState([]);
  const [deleteWorkflow, setDeleteWorkflow] = useState(false);
  const [switchLoading, setSwitchLoading] = useState<any>({});
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
  const [changeStatusTrigger] = useChangeStatusWorkflowMutation();
  const handleChangeStatus = async (rowData: any) => {
    const status =
      rowData?.status === REQUESTORS_STATUS?.ACTIVE
        ? REQUESTORS_STATUS?.INACTIVE
        : REQUESTORS_STATUS?.ACTIVE;
    setSwitchLoading((prevState: any) => ({
      ...prevState,
      [rowData?._id]: true,
    }));
    const response: any = await changeStatusTrigger({
      id: rowData?._id,
      body: { status },
    });
    try {
      response;
      successSnackbar(
        response?.data?.message &&
          `${rowData?.title} ${status?.toLocaleLowerCase()} successfully`,
      );
    } catch (error) {
      errorSnackbar(response?.error?.data?.message);
    } finally {
      setSwitchLoading({ ...switchLoading, [rowData?._id]: false });
    }
  };
  const assetsListsColumns = listsColumnsFunction(
    selectedAction,
    setSelectedAction,
    listData,
    theme,
    handleChangeStatus,
    switchLoading,
  );
  const handleActionClick = (actionType: string) => {
    if (actionType === ACTIONS_TYPES?.DELETE) {
      setDeleteWorkflow(true);
    } else if (actionType === ACTIONS_TYPES?.EDIT) {
      if (selectedAction?.length > 1) {
        errorSnackbar(`Can't update multiple records`);
      } else {
        router?.push({
          pathname: AIR_OPERATIONS?.UPSERT_EVENT_BASED_WORKFLOW,
          query: {
            action: EDIT_WORKFLOW,
            id: selectedId,
          },
        });
      }
    }
  };
  const [workflowCloneTrigger] = useCloneServicesWorkflowMutation();
  const handleCloneWorkflow = async () => {
    try {
      await workflowCloneTrigger(selectedId).unwrap();
      successSnackbar('Workflow Clone Successfully');
    } catch (error) {
      errorSnackbar();
    }
  };

  const dropdownOptions = EventBaseWorkflowActionsDropdown(
    handleActionClick,
    handleCloneWorkflow,
  );
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
