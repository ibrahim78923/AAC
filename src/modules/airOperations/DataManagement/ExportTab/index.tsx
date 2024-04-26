import TanstackTable from '@/components/Table/TanstackTable';
import { exportListData, exportTabColumnsFunction } from './ExportTab.data';
import { useExportTab } from './useExportTab';
import { Header } from './Header';

const ExportTab = () => {
  const { selectedTabList, setSelectedTabList, setPage, setPageLimit } =
    useExportTab();
  const exportTabColumns = exportTabColumnsFunction(
    exportListData,
    selectedTabList,
    setSelectedTabList,
  );
  const metaData: any = {};

  return (
    <>
      <Header />
      <TanstackTable
        columns={exportTabColumns}
        data={exportListData}
        isLoading={metaData?.isLoading}
        isFetching={metaData?.isFetching}
        isError={metaData?.isError}
        isSuccess={metaData?.isSuccess || true}
        currentPage={metaData?.data?.data?.meta?.page}
        count={metaData?.data?.data?.meta?.pages}
        pageLimit={metaData?.data?.data?.meta?.limit}
        totalRecords={metaData?.data?.data?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isPagination
      />
    </>
  );
};

export default ExportTab;
