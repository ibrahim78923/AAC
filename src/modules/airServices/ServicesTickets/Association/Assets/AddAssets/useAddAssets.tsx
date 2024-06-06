import { useTheme } from '@mui/material';
import { getAddAssetsColumns } from './AddAssets.data';
import { useGetAssociatesAssetsQuery } from '@/services/airServices/tickets/single-ticket-details/association';
import { useState } from 'react';
import { PAGINATION } from '@/config';

export default function useAddAssets({ setSelected, selected }: any) {
  const theme: any = useTheme();

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');

  const getAssociatesAssetsParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      search,
    },
  };
  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetAssociatesAssetsQuery(getAssociatesAssetsParameter, {
      refetchOnMountOrArgChange: true,
    });

  const addAssetsColumns = getAddAssetsColumns({
    theme,
    setSelected,
    selected,
    associatesAssetList: data?.data?.inventories,
  });

  return {
    addAssetsColumns,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPage,
    setPageLimit,
    setSearch,
  };
}
