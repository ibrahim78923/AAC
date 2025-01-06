import { useState } from 'react';
import { addExpenseColumnsFunction } from './Expense.data';
import { PAGINATION } from '@/config';
import { useGetAirServicesAssetsInventoryExpenseQuery } from '@/services/airServices/assets/inventory/single-inventory-details/expense';
import { useRouter } from 'next/router';
import { ExpenseI } from './Expense.interface';

export const useExpense = () => {
  const [selectedExpenseList, setSelectedExpenseList] = useState<ExpenseI[]>(
    [],
  );
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const router = useRouter();

  const assetId = router?.query?.inventoryId;

  const params = {
    assetId,
    page: page,
    limit: pageLimit,
  };

  const { data, isLoading, isSuccess, isFetching, isError, refetch } =
    useGetAirServicesAssetsInventoryExpenseQuery(params);

  const expenseData = data?.data?.expenses;
  const metaData = data?.data?.meta;

  const expenseColumns = addExpenseColumnsFunction(
    expenseData,
    selectedExpenseList,
    setSelectedExpenseList,
  );

  return {
    expenseColumns,
    expenseData,
    isFetching,
    isSuccess,
    isLoading,
    setPageLimit,
    setPage,
    pageLimit,
    metaData,
    isError,
    refetch,
    selectedExpenseList,
    setSelectedExpenseList,
  };
};
