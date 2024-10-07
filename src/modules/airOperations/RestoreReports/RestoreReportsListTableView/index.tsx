import TanstackTable from '@/components/Table/TanstackTable';
import { useRestoreReportListsTableView } from './useRestoreReportsListTableView';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const RestoreReportsListsTableView = () => {
  const {
    lazyGetRestoreReportsListStatus,
    handleSetPageLimit,
    handleSetPage,
    getRestoreReportsList,
    page,
    decrement,
    increment,
    restoreReportListsColumns,
  } = useRestoreReportListsTableView();

  if (!lazyGetRestoreReportsListStatus?.data) return <SkeletonTable />;

  return (
    <>
      <TanstackTable
        columns={restoreReportListsColumns}
        data={lazyGetRestoreReportsListStatus?.data?.data?.genericReports ?? []}
        isLoading={lazyGetRestoreReportsListStatus?.isLoading}
        currentPage={lazyGetRestoreReportsListStatus?.data?.data?.meta?.page}
        count={lazyGetRestoreReportsListStatus?.data?.data?.meta?.pages}
        pageLimit={lazyGetRestoreReportsListStatus?.data?.data?.meta?.limit}
        totalRecords={lazyGetRestoreReportsListStatus?.data?.data?.meta?.total}
        setPage={handleSetPage}
        setPageLimit={handleSetPageLimit}
        isFetching={lazyGetRestoreReportsListStatus?.isFetching}
        isError={lazyGetRestoreReportsListStatus?.isError}
        isSuccess={lazyGetRestoreReportsListStatus?.isSuccess}
        onPageChange={(page: number) => handleSetPage(page)}
        isPagination
        errorProps={{
          canRefresh: true,
          refresh: () => getRestoreReportsList?.(page),
        }}
        incrementPageClick={increment}
        decrementPageClick={decrement}
      />
    </>
  );
};
