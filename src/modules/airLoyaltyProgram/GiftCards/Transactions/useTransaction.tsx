import { useState } from 'react';
import { PAGINATION } from '@/config';
import { useGetTransactionListQuery } from '@/services/airLoyaltyProgram/giftCards/transactions';
import { otherDateFormat } from '@/lib/date-time';
import { CALENDAR_FORMAT } from '@/constants';

export const useTransaction = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
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
    ...(filterValues?.recipient && { recipient: filterValues.recipient }),
    ...(filterValues?.maxAmount && {
      maxcurrentamount: filterValues?.maxAmount,
    }),
    ...(filterValues?.minAmount && {
      minicurrentamount: filterValues?.minAmount,
    }),
  };

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  const { data, isFetching, isLoading, isError, isSuccess } =
    useGetTransactionListQuery<any>(
      {},
      {
        refetchOnMountOrArgChange: true,
      },
    );

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
