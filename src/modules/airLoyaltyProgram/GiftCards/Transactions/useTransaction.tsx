import { useState } from 'react';
import { PAGINATION } from '@/config';
import { useGetTransactionListQuery } from '@/services/airLoyaltyProgram/giftCards/transactions';
import { otherDateFormat } from '@/lib/date-time';
import { CALENDAR_FORMAT } from '@/constants';

export const useTransaction = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [openDrawer, setOpenDrawer] = useState<any>(false);
  const [filterValues, setFilterValues] = useState<any>({});

  const transactionParams = {
    page,
    limit,
    ...(search && { search }),
    ...(filterValues?.dateRange?.startDate && {
      activeFrom: otherDateFormat(
        filterValues?.dateRange?.startDate,
        CALENDAR_FORMAT?.YMD,
      ),
    }),
    ...(filterValues?.dateRange?.endDate && {
      activeTo: otherDateFormat(
        filterValues?.dateRange?.endDate,
        CALENDAR_FORMAT?.YMD,
      ),
    }),
    ...(filterValues?.maxAmount && {
      maxTransactionAmount: filterValues?.maxAmount,
    }),
    ...(filterValues?.minAmount && {
      minTransactionAmount: filterValues?.minAmount,
    }),
  };

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  const { data, isFetching, isLoading, isError, isSuccess } =
    useGetTransactionListQuery<any>(transactionParams, {
      refetchOnMountOrArgChange: true,
    });

  return {
    handleSearch,
    setPage,
    setPageLimit,
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
