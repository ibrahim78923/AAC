import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { PAGINATION } from '@/config';
import { Stack, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useAddDealsColumns } from './AddDeals.data';
import { useGetAssociatesOrderQuery } from '@/services/airServices/tickets/single-ticket-details/association';

export default function AddDeals({ setSelected, selected }: any) {
  const theme: any = useTheme();

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');

  const getAssociatesDealsParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      search,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetAssociatesOrderQuery(getAssociatesDealsParameter, {
      refetchOnMountOrArgChange: true,
    });

  const addDealsColumns = useAddDealsColumns({
    theme,
    setSelected,
    selected,
    associatesDealsList: data?.data?.deals,
  });

  return (
    <Stack direction={'column'} spacing={2}>
      <Search label="Search Here" width="100%" setSearchBy={setSearch} />
      <TanstackTable
        columns={addDealsColumns}
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
