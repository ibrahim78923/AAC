import TanstackTable from '@/components/Table/TanstackTable';
import { useReportListsTableView } from './useReportListsTableView';

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
