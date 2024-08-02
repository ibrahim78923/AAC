import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './Table.data';
import { API_STATUS } from '@/constants';

const Table = ({
  emailMarketingList,
  loading,
  setPage,
  setPageLimit,
  emailMarketingStatus,
  setSelectedRecords,
  selectedRecords,
}: any) => {
  return (
    <TanstackTable
      columns={columns(
        setSelectedRecords,
        selectedRecords,
        emailMarketingList?.data?.emailsmarketings,
      )}
      data={emailMarketingList?.data?.emailsmarketings ?? []}
      isLoading={loading}
      currentPage={emailMarketingList?.data?.meta?.page}
      count={emailMarketingList?.data?.meta?.pages}
      pageLimit={emailMarketingList?.data?.meta?.limit}
      totalRecords={emailMarketingList?.data?.meta?.total}
      setPage={setPage}
      setPageLimit={setPageLimit}
      isError={emailMarketingStatus === API_STATUS?.REJECTED}
      onPageChange={(page: any) => setPage(page)}
      isPagination
    />
  );
};
export default Table;
