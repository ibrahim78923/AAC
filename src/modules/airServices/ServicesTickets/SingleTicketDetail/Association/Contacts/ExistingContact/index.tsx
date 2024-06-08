import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { PAGINATION } from '@/config';
import { Stack, useTheme } from '@mui/material';
import { useState } from 'react';
import { useAddContactsColumns } from './ExistingContact.data';
import { useGetAssociatesContactsQuery } from '@/services/airServices/tickets/single-ticket-details/association';

export default function ExistingContact({ setSelected, selected }: any) {
  const theme: any = useTheme();

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');

  const getAssociatesContactsParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      search: search?.length ? search : undefined,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetAssociatesContactsQuery(getAssociatesContactsParameter, {
      refetchOnMountOrArgChange: true,
    });

  const addContactsColumns = useAddContactsColumns({
    theme,
    setSelected,
    selected,
    associatesContactsList: data?.data?.contacts,
  });

  return (
    <Stack direction={'column'} spacing={2}>
      <Search label="Search Here" width="100%" setSearchBy={setSearch} />
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
