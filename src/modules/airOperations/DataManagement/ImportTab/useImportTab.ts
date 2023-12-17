import { PAGINATION } from '@/config';
import { useState } from 'react';

export const useImportTab = () => {
  const [selectedTabList, setSelectedTabList] = useState([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');
  return {
    selectedTabList,
    setSelectedTabList,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    search,
    setSearch,
  };
};
