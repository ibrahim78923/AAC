import TanstackTable from '@/components/Table/TanstackTable';
import { useRelatedTickets } from './useRelatedTickets';
import { RelatedTicketsHeader } from './RelatedTicketsHeader';
import { UpsertRelatedTicket } from './UpsertRelatedTicket';
import { DeleteRelatedTicket } from './DeleteRelatedTicket';

const RelatedTickets = (props: any) => {
  const {
    setIsDrawerOpen,
    isDrawerOpen,
    selectedChildTickets,
    relatedTicketsColumns,
    headerFunctions,
    setPage,
    lazyGetChildTicketsStatus,
    setPageLimit,
    setSelectedChildTickets,
    relatedTicketsActionDropdown,
    isDelete,
    setIsDelete,
  } = useRelatedTickets(props);

  return (
    <div>
      <RelatedTicketsHeader
        relatedTicketsActionDropdown={relatedTicketsActionDropdown}
        isActive={!!!selectedChildTickets?.length}
        setIsDrawerOpen={setIsDrawerOpen}
        headerFunctions={headerFunctions}
      />

      {isDrawerOpen && (
        <UpsertRelatedTicket
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          data={selectedChildTickets}
          childTicketId={selectedChildTickets?.[0]}
          setSelectedChildTickets={setSelectedChildTickets}
        />
      )}
      <br />
      <TanstackTable
        isLoading={lazyGetChildTicketsStatus?.isLoading}
        data={[
          { _id: 10, ticketIdNumber: 12, status: 'OPEN' },
          { _id: 100, ticketIdNumber: 12, status: 'RESOLVED' },
          { _id: 210, ticketIdNumber: 12, status: 'PENDING' },
          { _id: 2110, ticketIdNumber: 12, status: 'CLOSED' },
          { _id: 10212, ticketIdNumber: 12, status: 'OPEN' },
        ]}
        // data={lazyGetChildTicketsStatus?.data?.data?.tickets ?? []}
        activeCheck={selectedChildTickets}
        columns={relatedTicketsColumns}
        // isFetching={lazyGetChildTicketsStatus?.isFetching}
        // isError={lazyGetChildTicketsStatus?.isError || false}
        // isSuccess={lazyGetChildTicketsStatus?.isSuccess || true}
        isSuccess={true}
        currentPage={lazyGetChildTicketsStatus?.data?.data?.meta?.page}
        count={lazyGetChildTicketsStatus?.data?.data?.meta?.pages}
        pageLimit={lazyGetChildTicketsStatus?.data?.data?.meta?.limit}
        totalRecords={lazyGetChildTicketsStatus?.data?.data?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isPagination
      />
      {isDelete && (
        <DeleteRelatedTicket
          isDelete={isDelete}
          setIsDelete={setIsDelete}
          selectedChildTickets={selectedChildTickets}
          setSelectedChildTickets={setSelectedChildTickets}
        />
      )}
    </div>
  );
};
export default RelatedTickets;
