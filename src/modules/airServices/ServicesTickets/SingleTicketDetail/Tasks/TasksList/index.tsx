import TanstackTable from '@/components/Table/TanstackTable';
import { useTasksList } from './useTasksList';
import { SkeletonTanStackTable } from '@/components/Skeletons/SkeletonTanStackTable';

export const TasksList = () => {
  const {
    ticketsTasksListsColumns,
    handleSetPage,
    handleSetPageLimit,
    increment,
    decrement,
    handlePageChange,
    refetch,
    lazyGetTicketsTasksStatus,
    isApiCalled,
  } = useTasksList();

  if (isApiCalled) return <SkeletonTanStackTable />;

  return (
    <TanstackTable
      columns={ticketsTasksListsColumns}
      data={lazyGetTicketsTasksStatus?.data?.data?.tasks}
      isLoading={lazyGetTicketsTasksStatus?.isLoading}
      currentPage={lazyGetTicketsTasksStatus?.data?.data?.meta?.page}
      count={lazyGetTicketsTasksStatus?.data?.data?.meta?.pages}
      pageLimit={lazyGetTicketsTasksStatus?.data?.data?.meta?.limit}
      totalRecords={lazyGetTicketsTasksStatus?.data?.data?.meta?.total}
      setPage={handleSetPage}
      setPageLimit={handleSetPageLimit}
      isFetching={lazyGetTicketsTasksStatus?.isFetching}
      isError={lazyGetTicketsTasksStatus?.isError}
      isSuccess={lazyGetTicketsTasksStatus?.isSuccess}
      onPageChange={handlePageChange}
      isPagination
      errorProps={{
        canRefresh: true,
        refresh: refetch,
      }}
      incrementPageClick={increment}
      decrementPageClick={decrement}
    />
  );
};
