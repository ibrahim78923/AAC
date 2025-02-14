import { useTicketTableView } from './useTicketTableView';
import TanstackTable from '@/components/Table/TanstackTable';

const TicketsTableView = () => {
  const {
    lazyGetTicketsStatus,
    handleSetPageLimit,
    handleSetPage,
    getTicketsListData,
    page,
    ticketsListsColumnPersist,
    ticketsListsActiveColumn,
    decrement,
    increment,
  } = useTicketTableView?.();

  return (
    <>
      <TanstackTable
        columns={
          ticketsListsColumnPersist?.filter((col: any) =>
            ticketsListsActiveColumn?.includes?.(col?.id),
          ) ?? []
        }
        data={lazyGetTicketsStatus?.data?.data?.tickets ?? []}
        isLoading={lazyGetTicketsStatus?.isLoading}
        isFetching={lazyGetTicketsStatus?.isFetching}
        isError={lazyGetTicketsStatus?.isError}
        isSuccess={lazyGetTicketsStatus?.isSuccess}
        currentPage={lazyGetTicketsStatus?.data?.data?.meta?.page}
        count={lazyGetTicketsStatus?.data?.data?.meta?.pages}
        pageLimit={lazyGetTicketsStatus?.data?.data?.meta?.limit}
        totalRecords={lazyGetTicketsStatus?.data?.data?.meta?.total}
        onPageChange={(page: number) => handleSetPage(page)}
        setPage={handleSetPage}
        setPageLimit={handleSetPageLimit}
        isPagination
        errorProps={{
          canRefresh: true,
          refresh: () => getTicketsListData?.(page),
        }}
        incrementPageClick={increment}
        decrementPageClick={decrement}
        noDataTableText="No tickets found"
      />
    </>
  );
};

export default TicketsTableView;
