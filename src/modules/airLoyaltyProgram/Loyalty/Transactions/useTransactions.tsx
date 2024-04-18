import { useEffect, useState } from 'react';
import { transactionsListColumnDynamic } from './Transactions.data';
import { TransactionFilters } from './TransactionFilters';
import UpsertTransactions from './UpsertTransactions';
import { PAGINATION } from '@/config';
import { useLazyGetLoyaltyTransactionsListQuery } from '@/services/airLoyaltyProgram/loyalty/transactions';
import { buildQueryParams } from '@/utils/api';

export const useTransitions = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<any>({});
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [transactionFilters, setTransactionsFilter] = useState<any>({});

  const transactionsListColumn = transactionsListColumnDynamic();

  const [
    lazyGetLoyaltyTransactionsListTrigger,
    lazyGetLoyaltyTransactionsListStatus,
  ] = useLazyGetLoyaltyTransactionsListQuery?.();

  const getTransactionList = async () => {
    const additionalParams = [
      ['page', page + ''],
      ['limit', pageLimit + ''],
    ];
    const getTransactionParam: any = buildQueryParams(
      additionalParams,
      transactionFilters,
    );
    const apiDataParameter = { queryParams: getTransactionParam };

    try {
      await lazyGetLoyaltyTransactionsListTrigger?.(apiDataParameter)?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getTransactionList?.();
  }, [page, pageLimit, transactionFilters]);

  const setTransactionDrawerContent = () => {
    if (isDrawerOpen?.isFilter) {
      return (
        <TransactionFilters
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          transactionFilters={transactionFilters}
          setTransactionsFilter={setTransactionsFilter}
        />
      );
    }
    if (isDrawerOpen?.isUpsert) {
      return (
        <UpsertTransactions
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      );
    }
  };

  return {
    transactionsListColumn,
    isDrawerOpen,
    setIsDrawerOpen,
    setTransactionDrawerContent,
    setPageLimit,
    setPage,
    lazyGetLoyaltyTransactionsListStatus,
  };
};
