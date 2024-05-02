import { useTransitions } from './useTransactions';
import TanstackTable from '@/components/Table/TanstackTable';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Button } from '@mui/material';
import { FilterLinesIcon } from '@/assets/icons';
import { AIR_LOYALTY_PROGRAM_LOYALTY_TRANSACTIONS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

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
        createPermissionKey={[
          AIR_LOYALTY_PROGRAM_LOYALTY_TRANSACTIONS_PERMISSIONS?.ADD_TRANSACTIONS,
        ]}
      >
        <PermissionsGuard
          permissions={[
            AIR_LOYALTY_PROGRAM_LOYALTY_TRANSACTIONS_PERMISSIONS?.APPLY_FILTERS,
          ]}
        >
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<FilterLinesIcon />}
            onClick={() => setIsDrawerOpen?.({ isOpen: true, isFilter: true })}
          >
            Filters
          </Button>
        </PermissionsGuard>
      </PageTitledHeader>
      <br />
      <PermissionsGuard
        permissions={[
          AIR_LOYALTY_PROGRAM_LOYALTY_TRANSACTIONS_PERMISSIONS?.VIEW_TRANSACTIONS_DETAILS,
        ]}
      >
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
      </PermissionsGuard>
      {isDrawerOpen?.isOpen && setTransactionDrawerContent?.()}
    </>
  );
};
