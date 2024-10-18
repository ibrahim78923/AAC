import { useTransitionRewards } from './useTransitionRewards';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { AIR_LOYALTY_PROGRAM_LOYALTY_TRANSACTIONS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import Search from '@/components/Search';

export const TransactionRewards = () => {
  const {
    transactionsListColumn,
    setRewardsDrawerContent,
    isDrawerOpen,
    setIsDrawerOpen,
    setPageLimit,
    setPage,
    getTransactionRewards,
    handleSearch,
  } = useTransitionRewards();

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
          columns={transactionsListColumn}
          data={getTransactionRewards?.data?.data ?? []}
          isLoading={getTransactionRewards?.isLoading}
          currentPage={getTransactionRewards?.data?.data?.meta?.page}
          count={getTransactionRewards?.data?.data?.meta?.pages}
          pageLimit={getTransactionRewards?.data?.data?.meta?.limit}
          totalRecords={getTransactionRewards?.data?.data?.meta?.total}
          setPage={setPage}
          setPageLimit={setPageLimit}
          isFetching={getTransactionRewards?.isFetching}
          isError={getTransactionRewards?.isError}
          isSuccess={getTransactionRewards?.isSuccess || true}
          onPageChange={(page: any) => setPage(page)}
          isPagination
        />
      </PermissionsGuard>
      {isDrawerOpen && setRewardsDrawerContent?.()}
    </>
  );
};
