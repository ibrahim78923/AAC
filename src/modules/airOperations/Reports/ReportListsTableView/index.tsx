import TanstackTable from '@/components/Table/TanstackTable';
import { useReportListsTableView } from './useReportListsTableView';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const ReportsListsTableView = () => {
  const {
    lazyGetReportsListStatus,
    handleSetPageLimit,
    handleSetPage,
    getReportsList,
    page,
    decrement,
    increment,
    reportListsColumns,
  } = useReportListsTableView();

  if (!lazyGetReportsListStatus?.data) return <SkeletonTable />;

  return (
    <>
      <TanstackTable
        columns={reportListsColumns}
        data={lazyGetReportsListStatus?.data?.data?.genericReports ?? []}
        isLoading={lazyGetReportsListStatus?.isLoading}
        currentPage={lazyGetReportsListStatus?.data?.data?.meta?.page}
        count={lazyGetReportsListStatus?.data?.data?.meta?.pages}
        pageLimit={lazyGetReportsListStatus?.data?.data?.meta?.limit}
        totalRecords={lazyGetReportsListStatus?.data?.data?.meta?.total}
        setPage={handleSetPage}
        setPageLimit={handleSetPageLimit}
        isFetching={lazyGetReportsListStatus?.isFetching}
        isError={lazyGetReportsListStatus?.isError}
        isSuccess={lazyGetReportsListStatus?.isSuccess}
        onPageChange={(page: number) => handleSetPage(page)}
        isPagination
        errorProps={{
          canRefresh: true,
          refresh: () => getReportsList?.(page),
        }}
        incrementPageClick={increment}
        decrementPageClick={decrement}
      />
    </>
  );
};
