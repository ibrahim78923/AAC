import TanstackTable from '@/components/Table/TanstackTable';
import { useRelatedTickets } from './useRelatedTickets';
import { RelatedTicketsHeader } from './RelatedTicketsHeader';
import CreateRelatedTickets from './CreateRelatedTickets';

const RelatedTickets = () => {
  const {
    setIsDrawerOpen,
    isDrawerOpen,
    drawerType,
    setDrawerType,
    selectedChildTickets,
    relatedTicketsColumns,
    headerFunctions,
    page,
    setPage,
    metaData,
    pageLimit,
    setPageLimit,
  } = useRelatedTickets();

  return (
    <div>
      <RelatedTicketsHeader
        isActive={selectedChildTickets}
        setIsDrawerOpen={setIsDrawerOpen}
        setDrawerType={setDrawerType}
        headerFunctions={headerFunctions}
      />

      {isDrawerOpen && (
        <CreateRelatedTickets
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          drawerType={drawerType}
          data={selectedChildTickets}
        />
      )}
      <br />
      <TanstackTable
        isLoading={metaData?.isLoading}
        data={metaData?.tickets ?? []}
        activeCheck={selectedChildTickets}
        columns={relatedTicketsColumns}
        isFetching={metaData?.isFetching}
        isError={metaData?.isError}
        isSuccess={metaData?.isSuccess}
        currentPage={page}
        count={metaData?.data?.meta?.pages}
        pageLimit={pageLimit}
        totalRecords={metaData?.data?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isPagination
      />
    </div>
  );
};
export default RelatedTickets;
