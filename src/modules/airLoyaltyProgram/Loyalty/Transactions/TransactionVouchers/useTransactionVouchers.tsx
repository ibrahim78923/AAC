import { useState } from 'react';
import { transactionsPointsColumns } from './TransactionVouchers.data';
import { PAGINATION } from '@/config';
import { TransactionVouchersFilter } from './TransactionVouchersFilter';

export const useTransactionVouchers = () => {
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
  const getTransactionVouchers: any = {};
  const setVouchersDrawerContent = () => {
    if (isDrawerOpen) {
      return (
        <TransactionVouchersFilter
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
    setVouchersDrawerContent,
    setPageLimit,
    setPage,
    page,
    pageLimit,
    search,
    getTransactionVouchers,
    handleSearch,
  };
};
