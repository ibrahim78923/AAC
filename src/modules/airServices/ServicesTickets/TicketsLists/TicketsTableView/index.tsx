import TanstackTable from '@/components/Table/TanstackTable';

export const TicketsTableView = (props: any) => {
  const {
    ticketsListsColumn,
    ticketListsData,
    setPage,
    isLoading,
    page,
    totalPages,
    pageLimit,
    totalRecords,
    setPageLimit,
    isFetching,
    isError,
    isSuccess,
  } = props;

  return (
    <>
      <TanstackTable
        columns={ticketsListsColumn}
        data={ticketListsData}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        count={totalPages}
        pageLimit={pageLimit}
        rowsPerPageOptions={[3, 5, 10, 15, 20, 60]}
        currentPage={page}
        totalRecords={totalRecords}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isPagination
      />
    </>
  );
};
