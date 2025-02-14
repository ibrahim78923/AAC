import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants/routes';
import {
  useLazyGetWorkflowListQuery,
  useDeleteWorkflowMutation,
  useCloneWorkflowMutation,
} from '@/services/airOperations/workflow-automation/sales-workflow';
import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { WorkflowI } from '@/types/modules/AirOperations/WorkflowAutomation';
import {
  salesWorkflowActionDropdownDynamic,
  salesWorkflowListsColumnDynamic,
} from './SalesListView.data';
import { filteredEmptyValues } from '@/utils/api';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { ARRAY_INDEX } from '@/constants/strings';

export const useSalesListView = ({ module }: { module: string }) => {
  const [activeCheck, setActiveCheck] = useState<WorkflowI[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [openDelete, setOpenDelete] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { push } = useRouter();
  const workflowData = activeCheck?.[ARRAY_INDEX?.ZERO];
  const handleEditWorkflow = () => {
    push({
      pathname: AIR_OPERATIONS?.UPSERT_SALES_WORKFLOW,
      query: { id: workflowData?._id },
    });
  };
  const [cloneWorkflowTrigger] = useCloneWorkflowMutation();
  const handleClone = async () => {
    try {
      await cloneWorkflowTrigger(workflowData?._id)?.unwrap();
      successSnackbar(`${workflowData?.title} clone successfully`);
      setActiveCheck([]);
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };
  const handleSearch = (searchValue: string) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(searchValue);
  };
  const actionDropdown = salesWorkflowActionDropdownDynamic(
    activeCheck,
    setOpenDelete,
    handleEditWorkflow,
    handleClone,
  );
  const [getWorkflowListTrigger, getWorkflowStatus] =
    useLazyGetWorkflowListQuery();
  const workflowParams = {
    page,
    limit,
    search,
    module,
  };
  const handleWorkflow = async () => {
    try {
      await getWorkflowListTrigger(workflowParams)?.unwrap();
    } catch (error) {}
  };
  useEffect(() => {
    handleWorkflow();
  }, [page, search, limit]);
  const onSubmitFilter = async (filterData: {
    status: string;
    createdBy: any;
    type: string;
  }) => {
    const filteredData = filteredEmptyValues(filterData);
    const filterParams: any = {
      ...workflowParams,
      ...filteredData,
      ...(!!filteredData?.createdBy && { createdBy: filterData.createdBy._id }),
    };
    try {
      setIsFilterOpen(false);
      await getWorkflowListTrigger(filterParams);
    } catch (error) {}
  };
  const tableColumns = salesWorkflowListsColumnDynamic(
    activeCheck,
    setActiveCheck,
    getWorkflowStatus?.data?.data?.workFlows,
  );
  const [deleteTrigger, { isLoading: deleteLoading }] =
    useDeleteWorkflowMutation();
  const handleDelete = async () => {
    const searchParams = new URLSearchParams();
    activeCheck?.forEach((item) => searchParams.append('ids', item?._id));
    try {
      await deleteTrigger(searchParams)?.unwrap();
      successSnackbar('Workflow Deleted Successfully');
      setActiveCheck([]);
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
    setOpenDelete(false);
  };
  return {
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    openDelete,
    setOpenDelete,
    tableColumns,
    actionDropdown,
    setLimit,
    setPage,
    activeCheck,
    onSubmitFilter,
    handleDelete,
    deleteLoading,
    handleWorkflow,
    getWorkflowStatus,
  };
};
