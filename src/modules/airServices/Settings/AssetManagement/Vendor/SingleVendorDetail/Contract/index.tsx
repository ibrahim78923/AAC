import { contractColumns } from './Contract.data';
import TanstackTable from '@/components/Table/TanstackTable';
import { useContract } from './useContract';

export const Contract = () => {
  const {
    contractVendorData,
    setPage,
    setPageLimit,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useContract();

  return (
    <TanstackTable
      data={contractVendorData?.data?.contracts}
      columns={contractColumns}
      isPagination
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
      isSuccess={isSuccess}
      setPageLimit={setPageLimit}
      setPage={setPage}
      currentPage={contractVendorData?.data?.meta?.page}
      count={contractVendorData?.data?.meta?.pages}
      pageLimit={contractVendorData?.data?.meta?.limit}
      totalRecords={contractVendorData?.data?.meta?.total}
      onPageChange={(page: any) => setPage(page)}
    />
  );
};

export default Contract;
