import { PAGINATION } from '@/config';
import { useGetCallsQuery } from '@/services/commonFeatures/calling';
import { useState } from 'react';

const useScheduleCalls = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const { data: Calls, isLoading } = useGetCallsQuery({
    page,
    pageLimit,
  });

  return {
    Calls: Calls?.data,
    setPage,
    setPageLimit,
    isLoading,
  };
};

export default useScheduleCalls;
