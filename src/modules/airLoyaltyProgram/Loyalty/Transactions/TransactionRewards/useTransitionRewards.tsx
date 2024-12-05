import { useEffect, useState } from 'react';
import { transactionsRewardsColumns } from './TransitionRewards.data';
import { PAGINATION } from '@/config';
import { TransactionRewardsFilter } from './TransactionRewardsFilter';
import { useLazyGetRewardTransactionsListQuery } from '@/services/airLoyaltyProgram/loyalty/transactions';
import { CALENDAR_FORMAT } from '@/constants';
import { otherDateFormat } from '@/lib/date-time';
import { filteredEmptyValues } from '@/utils/api';

export const useTransitionRewards = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<any>(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');
  const [isFilter, setIsFilter] = useState<any>({});
  const [getTransactionRewardsTrigger, getTransactionRewards] =
    useLazyGetRewardTransactionsListQuery<any>();
  const modifiedFilter = {
    rewardId: isFilter?.voucherRedeemed?._id,
    consumerId: isFilter?.consumer?._id,
    dateStart:
      isFilter?.dateRange?.startDate &&
      otherDateFormat(isFilter?.dateRange?.startDate, CALENDAR_FORMAT?.YMD),
    dateEnd:
      isFilter?.dateRange?.endDate &&
      otherDateFormat(isFilter?.dateRange?.endDate, CALENDAR_FORMAT?.YMD),
  };
  const handleTransactionRewards = async () => {
    const queryParams = {
      page,
      limit: pageLimit,
      search,
      ...modifiedFilter,
    };
    const filterValues = filteredEmptyValues?.(queryParams);
    await getTransactionRewardsTrigger(filterValues);
  };
  useEffect(() => {
    handleTransactionRewards();
  }, [page, pageLimit, search, isFilter]);
  const transactionsListColumn = transactionsRewardsColumns();
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
