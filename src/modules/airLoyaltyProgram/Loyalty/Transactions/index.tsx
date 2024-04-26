import { useTransitions } from './useTransactions';
import TanstackTable from '@/components/Table/TanstackTable';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Button } from '@mui/material';
import { FilterLinesIcon } from '@/assets/icons';

export const Transactions = () => {
  const {
    transactionsListColumn,
    setTransactionDrawerContent,
    isDrawerOpen,
    setIsDrawerOpen,
    setPageLimit,
    setPage,
    lazyGetLoyaltyTransactionsListStatus,
  } = useTransitions();

  return (
    <>
      <PageTitledHeader
        title={'Transactions'}
        handleAction={() => setIsDrawerOpen?.({ isOpen: true, isUpsert: true })}
        addTitle={'Add'}
      >
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<FilterLinesIcon />}
          onClick={() => setIsDrawerOpen?.({ isOpen: true, isFilter: true })}
        >
          Filters
        </Button>
      </PageTitledHeader>
      <br />
      <TanstackTable
        columns={transactionsListColumn}
        data={lazyGetLoyaltyTransactionsListStatus?.data?.data}
        isLoading={lazyGetLoyaltyTransactionsListStatus?.isLoading}
        currentPage={
          lazyGetLoyaltyTransactionsListStatus?.data?.data?.meta?.page
        }
        count={lazyGetLoyaltyTransactionsListStatus?.data?.data?.meta?.pages}
        pageLimit={
          lazyGetLoyaltyTransactionsListStatus?.data?.data?.meta?.limit
        }
        totalRecords={
          lazyGetLoyaltyTransactionsListStatus?.data?.data?.meta?.total
        }
        setPage={setPage}
        setPageLimit={setPageLimit}
        isFetching={lazyGetLoyaltyTransactionsListStatus?.isFetching}
        isError={lazyGetLoyaltyTransactionsListStatus?.isError}
        isSuccess={lazyGetLoyaltyTransactionsListStatus?.isSuccess}
        onPageChange={(page: any) => setPage(page)}
        isPagination
      />
      {isDrawerOpen?.isOpen && setTransactionDrawerContent?.()}
    </>
  );
};
