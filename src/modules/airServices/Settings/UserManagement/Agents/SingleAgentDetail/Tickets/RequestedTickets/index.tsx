import TanstackTable from '@/components/Table/TanstackTable';
import { useRequestedTickets } from './useRequestedTickets';

export const RequestedTickets = () => {
  const {
    setPage,
    setPageLimit,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    requestedTicketsColumns,
  }: any = useRequestedTickets();

  return (
    <TanstackTable
      columns={requestedTicketsColumns}
      data={data?.data?.tickets}
      isLoading={isLoading}
      currentPage={data?.data?.meta?.page}
      count={data?.data?.meta?.pages}
      pageLimit={data?.data?.meta?.limit}
      totalRecords={data?.data?.meta?.total}
      setPage={setPage}
      setPageLimit={setPageLimit}
      isFetching={isFetching}
      isError={isError}
      isSuccess={isSuccess}
      onPageChange={(page: any) => setPage(page)}
      isPagination
    />
  );
};
