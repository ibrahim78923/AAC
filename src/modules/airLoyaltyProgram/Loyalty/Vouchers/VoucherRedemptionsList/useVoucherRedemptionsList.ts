import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useVoucherRedemptionsList = () => {
  const router = useRouter();
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  return {
    page,
    setPage,
    pageLimit,
    setPageLimit,
    router,
  };
};
