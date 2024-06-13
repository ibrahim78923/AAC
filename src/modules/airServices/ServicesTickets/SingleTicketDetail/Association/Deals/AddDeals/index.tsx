import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Stack } from '@mui/material';
import useAddDeals from './useAddDeals';

export default function AddDeals({ setSelected, selected }: any) {
  const {
    setSearch,
    addDealsColumns,
    data,
    isSuccess,
    isError,
    isFetching,
    isLoading,
    setPage,
    setPageLimit,
  } = useAddDeals({
    setSelected,
    selected,
  });

  return (
    <Stack direction={'column'} spacing={2}>
      <Search label="Search Here" width="100%" setSearchBy={setSearch} />
      <TanstackTable
        columns={addDealsColumns}
        data={data?.data?.deals}
        isPagination
        isSuccess={isSuccess}
        isError={isError}
        isFetching={isFetching}
        isLoading={isLoading}
        currentPage={data?.data?.meta?.page}
        count={data?.data?.meta?.pages}
        pageLimit={data?.data?.meta?.limit}
        totalRecords={data?.data?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
      />
    </Stack>
  );
}
