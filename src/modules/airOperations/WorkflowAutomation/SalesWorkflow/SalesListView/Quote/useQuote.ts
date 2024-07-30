import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants';
import {
  useChangeStatusWorkflowMutation,
  useCloneWorkflowMutation,
  useDeleteWorkflowMutation,
  useLazyGetWorkflowListQuery,
} from '@/services/airOperations/workflow-automation/sales-workflow';
import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { REQUESTORS_STATUS } from '@/constants/strings';
import {
  salesWorkflowActionDropdownDynamic,
  salesWorkflowListsColumnDynamic,
} from '../../SalesWorkflow.data';
import { SalesWorkflowI } from '@/types/modules/AirOperations/WorkflowAutomation';

export const useQuote = () => {
  const [activeCheck, setActiveCheck] = useState<SalesWorkflowI[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [openDelete, setOpenDelete] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [switchLoading, setSwitchLoading] = useState<any>({});
  const { push } = useRouter();
  const workflowId = activeCheck?.find((item) => item);
  const handleEditWorkflow = () => {
    push({
      pathname: AIR_OPERATIONS?.UPSERT_SALES_WORKFLOW,
      query: { id: workflowId?._id },
    });
  };
  const [cloneWorkflowTrigger] = useCloneWorkflowMutation();
  const handleClone = async () => {
    const response: any = await cloneWorkflowTrigger(workflowId?._id);
    try {
      successSnackbar(
        response?.data?.message && `${workflowId?.title} clone successfully`,
      );
      setActiveCheck([]);
    } catch (error) {
      errorSnackbar(response?.error?.data?.message);
    }
  };
  const actionDropdown = salesWorkflowActionDropdownDynamic(
    activeCheck,
    setOpenDelete,
    handleEditWorkflow,
    handleClone,
  );
  const [
    getWorkflowListTrigger,
    { data, isLoading, isFetching, isError, isSuccess },
  ] = useLazyGetWorkflowListQuery();
  const workflowParams = {
    page,
    limit,
    search,
    module: 'QUOTES',
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
    if (filterData?.type) {
      filterParams.type = filterData?.type;
    }
    await getWorkflowListTrigger(filterParams);
    setIsFilterOpen(false);
  };
  const tableData = data?.data?.workFlows;
  const meta = data?.data?.meta;
  const [changeStatusTrigger] = useChangeStatusWorkflowMutation();
  const handleChangeStatus = async (rowData: SalesWorkflowI) => {
    const status =
      rowData?.status === REQUESTORS_STATUS?.ACTIVE
        ? REQUESTORS_STATUS?.INACTIVE
        : REQUESTORS_STATUS?.ACTIVE;
    setSwitchLoading((prevState: SalesWorkflowI) => ({
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
  const tableColumns = salesWorkflowListsColumnDynamic(
    activeCheck,
    setActiveCheck,
    tableData,
    handleChangeStatus,
    switchLoading,
  );
  const [deleteTrigger, { isLoading: deleteLoading }] =
    useDeleteWorkflowMutation();
  const deleteParams = activeCheck
    ?.map((item) => `ids=${item?._id}`)
    ?.join('&');
  const handleDelete = async () => {
    const response: any = await deleteTrigger(deleteParams);
    try {
      successSnackbar(
        response?.data?.message && 'Workflow Deleted Successfully',
      );
      setActiveCheck([]);
    } catch (e) {
      errorSnackbar(response?.error?.data?.message);
    }
    setOpenDelete(false);
  };
  return {
    isFilterOpen,
    setIsFilterOpen,
    search,
    setSearch,
    openDelete,
    setOpenDelete,
    tableColumns,
    actionDropdown,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    meta,
    tableData,
    limit,
    setLimit,
    page,
    setPage,
    activeCheck,
    onSubmitFilter,
    handleDelete,
    deleteLoading,
    handleWorkflow,
  };
};
