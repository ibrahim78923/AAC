import TanstackTable from '@/components/Table/TanstackTable';
import { useAssets } from './useAssets';
import AssetsHeader from './AssetsHeader';

const Assets = () => {
  const {
    assetsListsColumns,
    selectedAssetsList,
    assetsListData,
    assetsData,
    isLoading,
    isSuccess,
    isFetching,
    setPageLimit,
    setPage,
    pageLimit,
  } = useAssets();
  return (
    <>
      <AssetsHeader selectedAssetsList={selectedAssetsList} />
      <TanstackTable
        data={assetsListData}
        columns={assetsListsColumns}
        isPagination
        isFetching={isFetching}
        isSuccess={isSuccess}
        isLoading={isLoading}
        setPageLimit={setPageLimit}
        setPage={setPage}
        count={assetsData?.meta?.pages}
        totalRecords={assetsData?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        currentPage={assetsData?.meta?.page}
        pageLimit={pageLimit}
      />
    </>
  );
};

export default Assets;
