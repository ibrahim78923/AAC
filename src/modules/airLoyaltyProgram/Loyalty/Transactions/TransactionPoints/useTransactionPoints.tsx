import { useEffect, useState } from 'react';
import { transactionsPointsColumns } from './TransitionPoints.data';
import { PAGINATION } from '@/config';
import { TransactionPointsFilter } from './TransactionRewardsFilter';
import { useLazyGetPointTransactionsListQuery } from '@/services/airLoyaltyProgram/loyalty/transactions';
import { filteredEmptyValues } from '@/utils/api';
import { CALENDAR_FORMAT } from '@/constants';
import { otherDateFormat } from '@/lib/date-time';

export const useTransactionPoints = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<any>(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');
  const [isFilter, setIsFilter] = useState<any>({});
  const [getTransactionPointsTrigger, getTransactionPoints] =
    useLazyGetPointTransactionsListQuery<any>();
  const modifiedFilter = {
    consumer: isFilter?.consumer?._id,
    date:
      isFilter?.date && otherDateFormat(isFilter?.date, CALENDAR_FORMAT?.YMD),
  };
  const handleTransactionRewards = async () => {
    const queryParams = {
      page,
      limit: pageLimit,
      search,
      ...modifiedFilter,
    };
    const filterValues = filteredEmptyValues?.(queryParams);
    await getTransactionPointsTrigger(filterValues);
  };
  useEffect(() => {
    handleTransactionRewards();
  }, [page, pageLimit, search, isFilter]);
  const transactionsPointsListColumn = transactionsPointsColumns();
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    setPage(PAGINATION?.CURRENT_PAGE);
  };
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
    getTransactionPoints,
  };
};
