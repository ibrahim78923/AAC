import TanstackTable from '@/components/Table/TanstackTable';
import { useAssets } from './useAssets';
import ListViewHeader from '../ListViewHeader';

const Assets = () => {
  const {
    assetsListsColumns,
    listData,
    assetsData,
    isLoading,
    isSuccess,
    isFetching,
    setPage,
    limit,
    setLimit,
    setSearch,
    search,
    onSubmitListFilter,
    isDrawerOpen,
    setIsDrawerOpen,
    router,
    deleteWorkflow,
    setDeleteWorkflow,
    dropdownOptions,
    selectedAction,
    setSelectedAction,
    totalRecords,
    page,
    isError,
  } = useAssets();
  return (
    <>
      <ListViewHeader
        selectedList={!!!selectedAction?.length}
        setSearch={setSearch}
        search={search}
        onSubmitListFilter={onSubmitListFilter}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        router={router}
        deleteWorkflow={deleteWorkflow}
        setDeleteWorkflow={setDeleteWorkflow}
        dropdownOptions={dropdownOptions}
        selectedAction={selectedAction}
        setSelectedAction={setSelectedAction}
        totalRecords={totalRecords}
        page={page}
        setPage={setPage}
        listData={listData}
      />
      <TanstackTable
        data={listData}
        columns={assetsListsColumns}
        isPagination
        isFetching={isFetching}
        isSuccess={isSuccess}
        isLoading={isLoading}
        isError={isError}
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
