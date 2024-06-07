import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import useAddAssets from './useAddAssets';
import { Stack } from '@mui/material';

export default function AddAssets({ setSelected, selected }: any) {
  const {
    addAssetsColumns,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPage,
    setPageLimit,
    setSearch,
  } = useAddAssets({ setSelected, selected });

  return (
    <Stack direction={'column'} spacing={2}>
      <Search label="Search Here" width="100%" setSearchBy={setSearch} />
      <TanstackTable
        columns={addAssetsColumns}
        data={data?.data?.inventories}
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
