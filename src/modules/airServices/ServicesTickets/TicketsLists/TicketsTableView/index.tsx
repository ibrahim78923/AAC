import TanstackTable from '@/components/Table/TanstackTable';
import { PAGINATION } from '@/config';

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
        rowsPerPageOptions={PAGINATION?.ROWS_PER_PAGE}
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
