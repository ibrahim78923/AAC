import { PAGINATION } from '@/config';
import { useState } from 'react';
import { useAddContactsColumns } from './ExistingContact.data';
import { useGetAirServicesAssociatesContactsQuery } from '@/services/airServices/tickets/single-ticket-details/association';

export default function useExistingContact({ setSelected, selected }: any) {
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
    useGetAirServicesAssociatesContactsQuery(getAssociatesContactsParameter, {
      refetchOnMountOrArgChange: true,
    });

  const addContactsColumns = useAddContactsColumns({
    setSelected,
    selected,
    associatesContactsList: data?.data?.contacts,
  });

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  return {
    handleSearch,
    addContactsColumns,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPage,
    setPageLimit,
  };
}
