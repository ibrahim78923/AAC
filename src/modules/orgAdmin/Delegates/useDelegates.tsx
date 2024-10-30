import { PAGINATION } from '@/config';
import { useGetDelegateDashboardDataQuery } from '@/services/orgAdmin/Delegates';
import { Theme, useTheme } from '@mui/material';
import { useState } from 'react';

const useDelegates = () => {
  const theme: any = useTheme<Theme>();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const params = {
    page: page,
    limit: pageLimit,
  };

  const { data: getDelegateData, isLoading: getDelgateDataLoading } =
    useGetDelegateDashboardDataQuery(params);

  const tableDataParams = {
    setPage,
    setPageLimit,
    getDelegateData,
  };

  return {
    theme,
    isInviteModalOpen,
    setIsInviteModalOpen,
    getDelegateData,
    getDelgateDataLoading,
    setPage,
    setPageLimit,
    tableDataParams,
  };
};

export default useDelegates;
