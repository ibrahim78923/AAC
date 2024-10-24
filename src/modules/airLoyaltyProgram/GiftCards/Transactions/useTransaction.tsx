import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PAGINATION } from '@/config';
import { useLazyGetTransactionListQuery } from '@/services/airLoyaltyProgram/giftCards/transactions';

export const useTransaction = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [openDrawer, setOpenDrawer] = useState<any>(false);

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
  ] = useLazyGetTransactionListQuery();

  const meta = data?.data?.meta;

  const handleTransaction = async () => {
    await getTransactionTrigger(transactionParams);
  };

  useEffect(() => {
    handleTransaction();
  }, [page, limit, search]);

  return {
    router,
    search,
    handleSearch,
    open,
    setOpen,
    page,
    setPage,
    limit,
    setLimit,
    data,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    meta,
    openDrawer,
    setOpenDrawer,
  };
};
