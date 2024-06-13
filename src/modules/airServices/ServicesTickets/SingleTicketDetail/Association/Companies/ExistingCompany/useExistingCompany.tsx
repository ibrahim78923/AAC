import { PAGINATION } from '@/config';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useGetAssociatesCompanyQuery } from '@/services/airServices/tickets/single-ticket-details/association';
import { useAddCompanyColumns } from './ExistingCompany.data';

export default function useExistingCompany({ setSelected, selected }: any) {
  const theme: any = useTheme();

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');

  const postTicketsAssociatesCompanyParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      search: search?.length ? search : undefined,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetAssociatesCompanyQuery(postTicketsAssociatesCompanyParameter, {
      refetchOnMountOrArgChange: true,
    });

  const addCompanyColumns = useAddCompanyColumns({
    theme,
    setSelected,
    selected,
    associatesCompanyList: data?.data?.companies,
  });

  return {
    setSearch,
    addCompanyColumns,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPage,
    setPageLimit,
  };
}
