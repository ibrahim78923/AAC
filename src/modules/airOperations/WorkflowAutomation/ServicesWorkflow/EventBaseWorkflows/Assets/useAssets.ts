import { useState } from 'react';
import { assetsListsColumnsFunction } from './Assets.data';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { SCHEMA_KEYS } from '@/constants/strings';
import { useGetWorkflowQuery } from '@/services/airOperations/workflow-automation/services-workflow';

export const useAssets = () => {
  const theme = useTheme();
  const [selectedAssetsList, setSelectedAssetsList] = useState([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const queryParams = {
    page: page,
    limit: pageLimit,
    module: SCHEMA_KEYS?.ASSETS,
  };
  const { data, isLoading, isFetching, isSuccess } =
    useGetWorkflowQuery(queryParams);
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
    setPageLimit,
    setPage,
    page,
    pageLimit,
  };
};
