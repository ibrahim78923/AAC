import { useImportTab } from './useImportTab';
import TanstackTable from '@/components/Table/TanstackTable';
import { Header } from './Header';
import { EXPORT_TYPE } from '@/constants/strings';

export const ImportTab = () => {
  const {
    setPage,
    setPageLimit,
    data,
    isFetching,
    isError,
    isLoading,
    isSuccess,
    setSearch,
    setIsOpenFilterDrawer,
    isOpenFilterDrawer,
    setFilterValues,
    filterValues,
    listDataExport,
    importTabColumns,
  } = useImportTab();

  return (
    <>
      <Header
        setSearch={setSearch}
        setIsOpenFilterDrawer={setIsOpenFilterDrawer}
        setFilterValues={setFilterValues}
        isOpenFilterDrawer={isOpenFilterDrawer}
        setPage={setPage}
        filterValues={filterValues}
        handleExcelExport={() => listDataExport?.(EXPORT_TYPE?.XLS)}
        handleCsvExport={() => listDataExport?.(EXPORT_TYPE?.CSV)}
      />
      <TanstackTable
        columns={importTabColumns}
        data={data?.data?.datamanagements}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess || true}
        currentPage={data?.data?.meta?.page}
        count={data?.data?.meta?.pages}
        pageLimit={data?.data?.meta?.limit}
        totalRecords={data?.data?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isPagination
      />
    </>
  );
};
