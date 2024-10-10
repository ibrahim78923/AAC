import { PAGINATION } from '@/config';
import { useState } from 'react';

export const useConsumer = () => {
  const [searchBy, setSearchBy] = useState('');

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearchBy(data);
  };
  return {
    searchBy,
    setSearchBy,
    page,
    setPage,
    handleSearch,
  };
};
