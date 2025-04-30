import { PAGINATION } from '@/config';
import { CONTRACTS_STATUS } from '@/constants';
import { useGetCommonContractsListQuery } from '@/services/commonFeatures/contracts/contracts-dashboard';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

export default function useGridView({
  tabValue,
  activeFolder,
  filterParams,
}: any) {
  const theme = useTheme();

  const [isViewAllActivityDrawerOpen, setIsViewAllActivityDrawerOpen] =
    useState(false);

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  useEffect(() => {
    setPage(PAGINATION?.CURRENT_PAGE);
  }, [filterParams, tabValue]);

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetCommonContractsListQuery(
      {
        page,
        limit: pageLimit,
        folderId: activeFolder?._id,
        ...(tabValue !== CONTRACTS_STATUS?.ALL && { status: tabValue }),
        ...filterParams,
      },
      { skip: !activeFolder?._id },
    );

  return {
    isViewAllActivityDrawerOpen,
    setIsViewAllActivityDrawerOpen,
    data,
    isSuccess,
    isError,
    isFetching,
    isLoading,
    setPage,
    setPageLimit,
    theme,
  };
}
