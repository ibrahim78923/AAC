import { PAGINATION } from '@/config';
import { useState } from 'react';

export const useVouchers = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [addVouchersOpen, setAddVouchersOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  return {
    page,
    setPage,
    pageLimit,
    setPageLimit,
    addVouchersOpen,
    setAddVouchersOpen,
    filtersOpen,
    setFiltersOpen,
  };
};
