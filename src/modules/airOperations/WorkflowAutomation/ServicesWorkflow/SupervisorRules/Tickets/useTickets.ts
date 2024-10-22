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
  EventBaseWorkflowActionsDropdown,
  listsColumnsFunction,
} from './Tickets.data';
import { useRouter } from 'next/router';
import {
  useChangeStatusServicesWorkflowMutation,
  useCloneServicesWorkflowMutation,
  useLazyGetServicesWorkflowListQuery,
} from '@/services/airOperations/workflow-automation/services-workflow';
import { WorkflowI } from '@/types/modules/AirOperations/WorkflowAutomation';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { AIR_OPERATIONS } from '@/constants/routes';

export const useTickets = () => {
  const theme = useTheme();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [switchLoading, setSwitchLoading] = useState<any>({});
  const [selectedAction, setSelectedAction] = useState<WorkflowI[]>([]);
  const [deleteWorkflow, setDeleteWorkflow] = useState<boolean>(false);
  const EDIT_WORKFLOW = 'edit';
  const selectedId = selectedAction?.map((item) => item?._id);
  const [
    getWorkflowListTrigger,
    { data, isLoading, isFetching, isSuccess, isError },
  ]: any = useLazyGetServicesWorkflowListQuery();
  const totalRecords = data?.data?.workFlows;
  const workflowParams = {
    page,
    limit,
    search,
    module: SCHEMA_KEYS?.TICKETS,
    type: MODULES?.SUPERVISOR_RULES,
  };
  const handleWorkflow = async () => {
    await getWorkflowListTrigger(workflowParams);
  };
  useEffect(() => {
    handleWorkflow();
  }, [page, search, limit]);

  const onSubmitListFilter = async (filterData: WorkflowI) => {
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
  const listData = data?.data?.workFlows;
  const [changeStatusTrigger] = useChangeStatusServicesWorkflowMutation();

  const handleChangeStatus = async (rowData: WorkflowI) => {
    const status =
      rowData?.status === REQUESTORS_STATUS?.ACTIVE
        ? REQUESTORS_STATUS?.INACTIVE
        : REQUESTORS_STATUS?.ACTIVE;
    setSwitchLoading((prevState: WorkflowI) => ({
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

  const ticketsListsColumns = listsColumnsFunction(
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
      router?.push({
        pathname: AIR_OPERATIONS?.UPSERT_SUPERVISOR_RULES,
        query: {
          action: EDIT_WORKFLOW,
          id: selectedId,
        },
      });
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
    selectedAction,
    handleCloneWorkflow,
  );
  return {
    ticketsListsColumns,
    isLoading,
    isSuccess,
    isFetching,
    setPage,
    page,
    ticketsData,
    limit,
    setLimit,
    setSearch,
    onSubmitListFilter,
    isDrawerOpen,
    setIsDrawerOpen,
    selectedAction,
    router,
    deleteWorkflow,
    setDeleteWorkflow,
    dropdownOptions,
    listData,
    setSelectedAction,
    isError,
    totalRecords,
    handleWorkflow,
  };
};
