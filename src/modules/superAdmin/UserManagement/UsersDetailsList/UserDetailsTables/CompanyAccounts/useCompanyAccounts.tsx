import { PAGINATION } from '@/config';
import { useState } from 'react';

const useCompanyAccounts = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  return {
    page,
    setPage,
    pageLimit,
    setPageLimit,
  };
};

export default useCompanyAccounts;
