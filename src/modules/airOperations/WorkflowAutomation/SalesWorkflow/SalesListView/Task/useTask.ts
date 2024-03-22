import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants';
import { useLazyGetWorkflowListQuery } from '@/services/airOperations/workflow-automation/sales-workflow';
import {
  salesWorkflowActionDropdownDynamic,
  salesWorkflowListsColumnDynamic,
} from '../../SalesWorkflow.data';
import { PAGINATION } from '@/config';

export const useTask = () => {
  const [activeCheck, setActiveCheck] = useState<any>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [openDelete, setOpenDelete] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { push } = useRouter();
  const workflowId = activeCheck?.find((item: any) => item);
  const handleEditWorkflow = () => {
    push({
      pathname: AIR_OPERATIONS?.UPSERT_SALES_WORKFLOW,
      query: { id: workflowId?._id },
    });
  };
  const actionDropdown = salesWorkflowActionDropdownDynamic(
    activeCheck,
    setOpenDelete,
    handleEditWorkflow,
  );
  const [
    getWorkflowListTrigger,
    { data, isLoading, isFetching, isError, isSuccess },
  ] = useLazyGetWorkflowListQuery();
  const workflowParams = {
    page,
    limit,
    search,
    module: 'SALES_TASKS',
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
    setIsFilterOpen(false);
  };
  const tableData = data?.data?.workFlows;
  const meta = data?.data?.meta;
  const tableColumns = salesWorkflowListsColumnDynamic(
    activeCheck,
    setActiveCheck,
    tableData,
  );
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
  };
};
