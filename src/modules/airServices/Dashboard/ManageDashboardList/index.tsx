import TanstackTable from '@/components/Table/TanstackTable';
import { useManageDashboardList } from './useManageDashboardList';

export const ManageDashboardList = () => {
  const {
    manageDashboardsListColumns,
    lazyGetServicesDashboardListStatus,
    handleSetPage,
    handleSetPageLimit,
    handlePageChange,
    increment,
    decrement,
    refetchDashboardList,
  } = useManageDashboardList();

  return (
    <TanstackTable
      columns={manageDashboardsListColumns}
      data={lazyGetServicesDashboardListStatus?.data?.dynamicdashboards}
      isLoading={lazyGetServicesDashboardListStatus?.isLoading}
      currentPage={lazyGetServicesDashboardListStatus?.data?.meta?.page}
      count={lazyGetServicesDashboardListStatus?.data?.meta?.pages}
      pageLimit={lazyGetServicesDashboardListStatus?.data?.meta?.limit}
      totalRecords={lazyGetServicesDashboardListStatus?.data?.meta?.total}
      setPage={handleSetPage}
      setPageLimit={handleSetPageLimit}
      isFetching={lazyGetServicesDashboardListStatus?.isFetching}
      isError={lazyGetServicesDashboardListStatus?.isError}
      isSuccess={lazyGetServicesDashboardListStatus?.isSuccess}
      onPageChange={handlePageChange}
      isPagination
      errorProps={{
        canRefresh: true,
        refresh: refetchDashboardList,
      }}
      noDataTableText="No Dashboards Found"
      incrementPageClick={increment}
      decrementPageClick={decrement}
    />
  );
};
