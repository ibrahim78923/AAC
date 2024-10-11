import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Stack } from '@mui/material';
import useExistingContact from './useExistingContact';

export default function ExistingContact({ setSelected, selected }: any) {
  const {
    handleSearch,
    addContactsColumns,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPage,
    setPageLimit,
  } = useExistingContact({ setSelected, selected });

  return (
    <Stack direction={'column'} spacing={2}>
      <Search label="Search Here" width="100%" setSearchBy={handleSearch} />
      <TanstackTable
        columns={addContactsColumns}
        data={data?.data?.contacts}
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
