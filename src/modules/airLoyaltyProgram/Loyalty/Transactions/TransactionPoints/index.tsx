import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { AIR_LOYALTY_PROGRAM_LOYALTY_TRANSACTIONS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import Search from '@/components/Search';
import { useTransactionPoints } from './useTransactionPoints';

export const TransactionPoints = () => {
  const {
    transactionsPointsListColumn,
    setDrawerContent,
    isDrawerOpen,
    setIsDrawerOpen,
    setPageLimit,
    setPage,
    getTransactionPointsData,
    handleSearch,
  } = useTransactionPoints();

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
          data={getTransactionPointsData?.data?.data}
          isLoading={getTransactionPointsData?.isLoading}
          currentPage={getTransactionPointsData?.data?.data?.meta?.page}
          count={getTransactionPointsData?.data?.data?.meta?.pages}
          pageLimit={getTransactionPointsData?.data?.data?.meta?.limit}
          totalRecords={getTransactionPointsData?.data?.data?.meta?.total}
          setPage={setPage}
          setPageLimit={setPageLimit}
          isFetching={getTransactionPointsData?.isFetching}
          isError={getTransactionPointsData?.isError}
          isSuccess={getTransactionPointsData?.isSuccess || true}
          onPageChange={(page: any) => setPage(page)}
          isPagination
        />
      </PermissionsGuard>
      {isDrawerOpen && setDrawerContent?.()}
    </>
  );
};
