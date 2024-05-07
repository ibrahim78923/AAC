import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { useLazyGetTransactionListQuery } from '@/services/airLoyaltyProgram/giftCards/transactions';
import { successSnackbar } from '@/utils/api';
import { TRANSACTIONS_ACTIONS } from './Transactions.data';
import { AddTransaction } from './AddTransaction';
import { ExportModal } from '@/components/ExportModal';
import { TransactionFilter } from './TransactionFilter';

export const useTransaction = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [openDrawer, setOpenDrawer] = useState<any>({});
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

  const exportFile = () => {
    setOpen(false);
    successSnackbar('File Exported Successfully');
  };

  const setTransactionDrawerContent = () => {
    if (openDrawer?.type === TRANSACTIONS_ACTIONS?.ADD) {
      return (
        <AddTransaction openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      );
    }
    if (openDrawer?.type === TRANSACTIONS_ACTIONS?.EXPORT) {
      return (
        <ExportModal
          open={openDrawer}
          handleClose={() => setOpenDrawer('')}
          onSubmit={() => exportFile()}
        />
      );
    }
    if (openDrawer?.type === TRANSACTIONS_ACTIONS?.FILTER) {
      return (
        <TransactionFilter
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />
      );
    }
    return <></>;
  };

  return {
    theme,
    router,
    search,
    setSearch,
    handleClick,
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
    openDrawer,
    setOpenDrawer,
    setTransactionDrawerContent,
  };
};
