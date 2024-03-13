import TanstackTable from '@/components/Table/TanstackTable';
import { useSoftware } from './useSoftware';

export const Software = () => {
  const {
    setPage,
    setPageLimit,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    softwareColumns,
  }: any = useSoftware();

  return (
    <TanstackTable
      columns={softwareColumns}
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
