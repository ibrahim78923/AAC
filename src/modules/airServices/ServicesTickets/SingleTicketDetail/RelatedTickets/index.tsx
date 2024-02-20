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
    setPage,
    data,
    setPageLimit,
    setSelectedChildTickets,
    relatedTicketsActionDropdown,
    isDelete,
    setIsDelete,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useRelatedTickets(props);

  return (
    <>
      <br />
      <RelatedTicketsHeader
        relatedTicketsActionDropdown={relatedTicketsActionDropdown}
        isActive={!!!selectedChildTickets?.length}
        setIsDrawerOpen={setIsDrawerOpen}
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
        isLoading={isLoading}
        data={
          data?.data?.tickets?.length > 1
            ? data?.data?.tickets
            : !!data?.data?.tickets?.[0]?.childTicketDetails?._id
            ? data?.data?.tickets
            : []
        }
        activeCheck={selectedChildTickets}
        columns={relatedTicketsColumns}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess || true}
        pageLimit={data?.data?.meta?.limit}
        currentPage={
          data?.data?.tickets?.length > 1
            ? data?.data?.meta?.page
            : !!data?.data?.tickets?.[0]?.childTicketDetails?._id
            ? data?.data?.meta?.page
            : 0
        }
        count={
          data?.data?.tickets?.length > 1
            ? data?.data?.meta?.pages
            : !!data?.data?.tickets?.[0]?.childTicketDetails?._id
            ? data?.data?.meta?.pages
            : 0
        }
        totalRecords={
          data?.data?.tickets?.length > 1
            ? data?.data?.meta?.total
            : !!data?.data?.tickets?.[0]?.childTicketDetails?._id
            ? data?.data?.meta?.total
            : 0
        }
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
          setPage={setPage}
        />
      )}
    </>
  );
};

export default RelatedTickets;
