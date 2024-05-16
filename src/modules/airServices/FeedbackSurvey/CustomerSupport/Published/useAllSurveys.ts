import { useState } from 'react';
import { PAGINATION } from '@/config';
import { feedbackTableData } from './Published.data';

export const usePublished = () => {
  const [activeCheck, setActiveCheck] = useState([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  return {
    search,
    setSearch,
    activeCheck,
    setActiveCheck,
    feedbackTableData,
    page,
    setPage,
    limit,
    setLimit,
  };
};
