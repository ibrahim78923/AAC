import { PAGINATION } from '@/config';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useAddContactsColumns } from './ExistingContact.data';
import { useGetAssociatesContactsQuery } from '@/services/airServices/tickets/single-ticket-details/association';

export default function useExistingContact({ setSelected, selected }: any) {
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

  return {
    setSearch,
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
