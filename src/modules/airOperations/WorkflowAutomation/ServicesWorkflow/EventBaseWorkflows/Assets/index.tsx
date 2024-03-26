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
    setPage,
    limit,
    setLimit,
    setSearch,
    search,
    onSubmitAssetsFilter,
    isDrawerOpen,
    setIsDrawerOpen,
  } = useAssets();
  return (
    <>
      <AssetsHeader
        selectedAssetsList={selectedAssetsList}
        setSearch={setSearch}
        search={search}
        onSubmitAssetsFilter={onSubmitAssetsFilter}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <TanstackTable
        data={assetsListData}
        columns={assetsListsColumns}
        isPagination
        isFetching={isFetching}
        isSuccess={isSuccess}
        isLoading={isLoading}
        setPageLimit={setLimit}
        setPage={setPage}
        count={assetsData?.meta?.pages}
        totalRecords={assetsData?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        currentPage={assetsData?.meta?.page}
        pageLimit={limit}
      />
    </>
  );
};

export default Assets;
