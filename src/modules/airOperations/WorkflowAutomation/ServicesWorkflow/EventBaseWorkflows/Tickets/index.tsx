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
    setPageLimit,
    setPage,
    ticketsData,
    pageLimit,
  } = useTickets();
  return (
    <>
      <TicketsHeader selectedTicketsList={selectedTicketsList} />
      <TanstackTable
        data={ticketsListData}
        columns={ticketsListsColumns}
        isPagination
        isFetching={isFetching}
        isSuccess={isSuccess}
        isLoading={isLoading}
        setPageLimit={setPageLimit}
        setPage={setPage}
        count={ticketsData?.meta?.pages}
        totalRecords={ticketsData?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        currentPage={ticketsData?.meta?.page}
        pageLimit={pageLimit}
      />
    </>
  );
};

export default Tickets;
