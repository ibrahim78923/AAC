import { getAddAssetsColumns } from './AddAssets.data';
import { useGetAirServicesAssociatesAssetsQuery } from '@/services/airServices/tickets/single-ticket-details/association';
import { useMemo, useState } from 'react';
import { PAGINATION } from '@/config';
import { getActiveAccountSession } from '@/utils';

export default function useAddAssets({ setSelected, selected }: any) {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');

  const product = useMemo(() => getActiveAccountSession(), []);
  const companyIdStorage = product?.company?._id;

  const getAssociatesAssetsParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      search,
      companyId: companyIdStorage,
    },
  };
  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetAirServicesAssociatesAssetsQuery(getAssociatesAssetsParameter, {
      refetchOnMountOrArgChange: true,
    });

  const addAssetsColumns = getAddAssetsColumns({
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
