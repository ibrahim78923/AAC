import { useState } from 'react';
import { transactionsPointsColumns } from './TransitionPoints.data';
import { PAGINATION } from '@/config';
import { TransactionPointsFilter } from './TransactionRewardsFilter';

export const useTransactionPoints = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<any>(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');
  const [isFilter, setIsFilter] = useState<any>({});

  const transactionsPointsListColumn = transactionsPointsColumns();
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    setPage(PAGINATION?.CURRENT_PAGE);
  };
  const getTransactionPointsData: any = {};
  const setDrawerContent = () => {
    if (isDrawerOpen) {
      return (
        <TransactionPointsFilter
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          isFilter={isFilter}
          setIsFilter={setIsFilter}
        />
      );
    }
  };

  return {
    transactionsPointsListColumn,
    isDrawerOpen,
    setIsDrawerOpen,
    setDrawerContent,
    setPageLimit,
    setPage,
    handleSearch,
    page,
    pageLimit,
    search,
    getTransactionPointsData,
  };
};
