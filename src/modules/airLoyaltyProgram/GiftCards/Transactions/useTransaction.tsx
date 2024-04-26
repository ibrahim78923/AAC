import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { PAGINATION } from '@/config';
import { useLazyGetTransactionListQuery } from '@/services/airLoyaltyProgram/giftCards/transactions';

export const useTransaction = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const transactionParams = {
    page,
    limit,
    search,
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

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    setOpen(false);
    enqueueSnackbar('File Exported Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  return {
    theme,
    router,
    search,
    setSearch,
    handleClick,
    onSubmit,
    open,
    setOpen,
    handleClose,
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
  };
};
