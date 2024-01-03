import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useGetCallsQuery } from '@/services/commonFeatures/calling';
import { PAGINATION } from '@/config';

const useCalls = () => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const query = '&';

  const {
    data: CompanyCalls,
    isLoading,
    isError,
  } = useGetCallsQuery({
    page,
    pageLimit,
    query,
  });

  return {
    openDrawer,
    setOpenDrawer,
    theme,
    CompanyCalls,
    isLoading,
    isError,
    setPageLimit,
    setPage,
  };
};

export default useCalls;
