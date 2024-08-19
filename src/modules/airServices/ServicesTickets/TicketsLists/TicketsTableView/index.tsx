import TanstackTable from '@/components/Table/TanstackTable';
import { TicketTableViewPropsI } from '../TicketsLists.interface';

export const TicketsTableView = (props: TicketTableViewPropsI) => {
  const {
    ticketsListsColumn,
    ticketListsData,
    metaData,
    setPage,
    setPageLimit,
    getTicketsListData,
    page,
  } = props;

  return (
    <>
      <TanstackTable
        columns={ticketsListsColumn}
        data={ticketListsData ?? []}
        isLoading={metaData?.isLoading}
        isFetching={metaData?.isFetching}
        isError={metaData?.isError}
        isSuccess={metaData?.isSuccess}
        currentPage={metaData?.data?.data?.meta?.page}
        count={metaData?.data?.data?.meta?.pages}
        pageLimit={metaData?.data?.data?.meta?.limit}
        totalRecords={metaData?.data?.data?.meta?.total}
        onPageChange={(page: number) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isPagination
        errorProps={{
          canRefresh: true,
          refresh: () => getTicketsListData?.(page),
        }}
      />
    </>
  );
};
