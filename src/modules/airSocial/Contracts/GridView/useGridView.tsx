import { PAGINATION } from '@/config';
import { CONTRACTS_STATUS } from '@/constants';
import { useGetCommonContractsListQuery } from '@/services/commonFeatures/contracts/contracts-dashboard';
import { useTheme } from '@mui/material';
import { useState } from 'react';

export default function useGridView({ tabValue }: any) {
  const theme = useTheme();

  const [isViewAllActivityDrawerOpen, setIsViewAllActivityDrawerOpen] =
    useState(false);

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetCommonContractsListQuery({
      page,
      limit: pageLimit,
      folderId: '676a8264884c3ce8851b91f9',
      ...(tabValue !== CONTRACTS_STATUS?.ALL && { status: tabValue }),
    });

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
