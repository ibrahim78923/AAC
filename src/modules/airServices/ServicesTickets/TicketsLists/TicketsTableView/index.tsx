import TanstackTable from '@/components/Table/TanstackTable';

export const TicketsTableView = (props: any) => {
  const {
    ticketsListsColumn,
    ticketListsData,
    metaData,
    setPage,
    setPageLimit,
  } = props;

  return (
    <>
      <TanstackTable
        columns={ticketsListsColumn}
        data={ticketListsData}
        isLoading={metaData?.isLoading}
        isFetching={metaData?.isFetching}
        isError={metaData?.isError}
        isSuccess={metaData?.isSuccess || true}
        currentPage={metaData?.data?.data?.meta?.page}
        count={metaData?.data?.data?.meta?.pages}
        pageLimit={metaData?.data?.data?.meta?.limit}
        totalRecords={metaData?.data?.data?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isPagination
      />
    </>
  );
};
