import { PAGINATION } from '@/config';
import { useState } from 'react';
import { useAddDealsColumns } from './AddDeals.data';
import { useGetAirServicesAssociatesDealsQuery } from '@/services/airServices/tickets/single-ticket-details/association';

export default function useAddDeals({ setSelected, selected }: any) {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');

  const getAssociatesDealsParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      search: search?.length ? search : undefined,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetAirServicesAssociatesDealsQuery(getAssociatesDealsParameter, {
      refetchOnMountOrArgChange: true,
    });

  const addDealsColumns = useAddDealsColumns({
    setSelected,
    selected,
    associatesDealsList: data?.data?.deals,
  });

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  return {
    handleSearch,
    addDealsColumns,
    data,
    isSuccess,
    isError,
    isFetching,
    isLoading,
    setPage,
    setPageLimit,
  };
}
