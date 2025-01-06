import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { AIR_LOYALTY_PROGRAM_LOYALTY_TRANSACTIONS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import Search from '@/components/Search';
import { useTransactionVouchers } from './useTransactionVouchers';

export const TransactionVouchers = () => {
  const {
    transactionsPointsListColumn,
    setVouchersDrawerContent,
    isDrawerOpen,
    setIsDrawerOpen,
    setPageLimit,
    setPage,
    getTransactionVouchers,
    handleSearch,
  } = useTransactionVouchers();

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Search width="25rem" label="Search Here" setSearchBy={handleSearch} />
        <PermissionsGuard
          permissions={[
            AIR_LOYALTY_PROGRAM_LOYALTY_TRANSACTIONS_PERMISSIONS?.APPLY_FILTERS,
          ]}
        >
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<FilterListIcon />}
            onClick={() => setIsDrawerOpen?.(true)}
            className="small"
          >
            Filters
          </Button>
        </PermissionsGuard>
      </Box>
      <br />
      <PermissionsGuard
        permissions={[
          AIR_LOYALTY_PROGRAM_LOYALTY_TRANSACTIONS_PERMISSIONS?.VIEW_TRANSACTIONS_DETAILS,
        ]}
      >
        <TanstackTable
          columns={transactionsPointsListColumn}
          data={getTransactionVouchers?.data?.data?.vouchers ?? []}
          isLoading={getTransactionVouchers?.isLoading}
          currentPage={getTransactionVouchers?.data?.data?.meta?.page}
          count={getTransactionVouchers?.data?.data?.meta?.pages}
          pageLimit={getTransactionVouchers?.data?.data?.meta?.limit}
          totalRecords={getTransactionVouchers?.data?.data?.meta?.total}
          setPage={setPage}
          setPageLimit={setPageLimit}
          isFetching={getTransactionVouchers?.isFetching}
          isError={getTransactionVouchers?.isError}
          isSuccess={getTransactionVouchers?.isSuccess || true}
          onPageChange={(page: any) => setPage(page)}
          isPagination
        />
      </PermissionsGuard>
      {isDrawerOpen && setVouchersDrawerContent?.()}
    </>
  );
};
