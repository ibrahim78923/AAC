import { useState } from 'react';
import { transactionsRewardsColumns } from './TransitionRewards.data';
import { PAGINATION } from '@/config';
import { TransactionRewardsFilter } from './TransactionRewardsFilter';

export const useTransitionRewards = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<any>(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');
  const [isFilter, setIsFilter] = useState<any>({});

  const transactionsListColumn = transactionsRewardsColumns();
  const getTransactionRewards: any = {};
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    setPage(PAGINATION?.CURRENT_PAGE);
  };
  const setRewardsDrawerContent = () => {
    if (isDrawerOpen) {
      return (
        <TransactionRewardsFilter
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          isFilter={isFilter}
          setIsFilter={setIsFilter}
        />
      );
    }
  };

  return {
    transactionsListColumn,
    isDrawerOpen,
    setIsDrawerOpen,
    setRewardsDrawerContent,
    setPageLimit,
    setPage,
    search,
    page,
    pageLimit,
    getTransactionRewards,
    handleSearch,
  };
};
