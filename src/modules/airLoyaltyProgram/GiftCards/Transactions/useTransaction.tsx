import { useEffect, useState } from 'react';
import { PAGINATION } from '@/config';
import { useLazyGetTransactionListQuery } from '@/services/airLoyaltyProgram/giftCards/transactions';
import { errorSnackbar } from '@/lib/snackbar';

export const useTransaction = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [openDrawer, setOpenDrawer] = useState<any>(false);
  const [filterValues, setFilterValues] = useState<any>({});

  const transactionParams = {
    page,
    limit,
    search,
  };

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  const [
    getTransactionTrigger,
    { data, isFetching, isLoading, isError, isSuccess },
  ] = useLazyGetTransactionListQuery<any>();

  const handleTransaction = async () => {
    try {
      await getTransactionTrigger(null);
    } catch (error) {
      errorSnackbar(error ?? 'Error while fetching gift card transaction list');
    }
  };

  useEffect(() => {
    handleTransaction();
  }, [page, limit, search]);

  return {
    search,
    handleSearch,
    setPage,
    setLimit,
    data,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    openDrawer,
    setOpenDrawer,
    transactionParams,
    setFilterValues,
    filterValues,
  };
};
