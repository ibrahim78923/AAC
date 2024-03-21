import { useEffect, useState } from 'react';
import { assetsListsColumnsFunction } from './Assets.data';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { SCHEMA_KEYS } from '@/constants/strings';
import { useLazyGetWorkflowListQuery } from '@/services/airOperations/workflow-automation/sales-workflow';

export const useAssets = () => {
  const theme = useTheme();
  const [selectedAssetsList, setSelectedAssetsList] = useState([]);
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
    module: SCHEMA_KEYS?.ASSETS,
  };
  const handleWorkflow = async () => {
    await getWorkflowListTrigger(workflowParams);
  };
  useEffect(() => {
    handleWorkflow();
  }, [page, search, limit]);
  const onSubmitAssetsFilter = async (filterData: any) => {
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
  const assetsListData = data?.data?.workFlows;
  const assetsListsColumns = assetsListsColumnsFunction(
    selectedAssetsList,
    setSelectedAssetsList,
    assetsListData,
    theme,
  );
  return {
    assetsListsColumns,
    selectedAssetsList,
    assetsListData,
    assetsData,
    isLoading,
    isSuccess,
    isFetching,
    setPage,
    limit,
    setLimit,
    setSearch,
    search,
    onSubmitAssetsFilter,
    isDrawerOpen,
    setIsDrawerOpen,
  };
};
