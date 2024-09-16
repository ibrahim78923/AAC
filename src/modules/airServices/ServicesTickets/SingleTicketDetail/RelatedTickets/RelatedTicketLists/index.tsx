import { useRelatedTicketsLists } from './useRelatedTicketLists';
import TanstackTable from '@/components/Table/TanstackTable';

export const RelatedTicketsList = () => {
  const {
    relatedTicketsListsColumn,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    handleSetPage,
    handleSetPageLimit,
    totalRelatedTickets,
    count,
    totalPages,
    currentPage,
    pageSize,
    increment,
    decrement,
    handlePageChange,
    refetch,
  } = useRelatedTicketsLists();

  return (
    <>
      <TanstackTable
        isLoading={isLoading}
        data={totalRelatedTickets}
        columns={relatedTicketsListsColumn}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        pageLimit={pageSize}
        currentPage={currentPage}
        count={count}
        totalRecords={totalPages}
        onPageChange={handlePageChange}
        setPage={handleSetPage}
        setPageLimit={handleSetPageLimit}
        isPagination
        errorProps={{
          canRefresh: true,
          refresh: refetch,
        }}
        incrementPageClick={() => increment?.()}
        decrementPageClick={() => decrement?.()}
      />
    </>
  );
};
