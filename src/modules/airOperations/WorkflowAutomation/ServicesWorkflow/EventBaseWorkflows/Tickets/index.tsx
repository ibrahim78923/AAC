import TanstackTable from '@/components/Table/TanstackTable';
import { useTickets } from './useTickets';
import TicketsHeader from './TicketsHeader';

const Tickets = () => {
  const {
    ticketsListsColumns,
    selectedTicketsList,
    ticketsListData,
    isLoading,
    isSuccess,
    isFetching,
    setLimit,
    setPage,
    ticketsData,
    limit,
    setSearch,
    search,
    onSubmitFilter,
    isDrawerOpen,
    setIsDrawerOpen,
  } = useTickets();
  return (
    <>
      <TicketsHeader
        selectedTicketsList={selectedTicketsList}
        setSearch={setSearch}
        search={search}
        onSubmitFilter={onSubmitFilter}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <TanstackTable
        data={ticketsListData}
        columns={ticketsListsColumns}
        isPagination
        isFetching={isFetching}
        isSuccess={isSuccess}
        isLoading={isLoading}
        setLimit={setLimit}
        setPage={setPage}
        count={ticketsData?.meta?.pages}
        totalRecords={ticketsData?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        currentPage={ticketsData?.meta?.page}
        limit={limit}
      />
    </>
  );
};

export default Tickets;
