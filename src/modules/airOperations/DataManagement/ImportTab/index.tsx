import { useImportTab } from './useImportTab';
import TanstackTable from '@/components/Table/TanstackTable';
import { Header } from './Header';
import { importListData, importTabColumnsFunction } from './ImportTab.data';

const ImportTab = () => {
  const { selectedTabList, setSelectedTabList, setPage, setPageLimit } =
    useImportTab();
  const importTabColumns = importTabColumnsFunction(
    importListData,
    selectedTabList,
    setSelectedTabList,
  );
  const metaData: any = {};

  return (
    <>
      <Header />
      <TanstackTable
        columns={importTabColumns}
        data={importListData}
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

export default ImportTab;
