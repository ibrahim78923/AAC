import { useGetAirServicesAssociatesOrderQuery } from '@/services/airServices/tickets/single-ticket-details/association';
import { useState } from 'react';
import { PAGINATION } from '@/config';
import { getAddPurchaseOrderColumns } from './AddPurchaseOrder.data';

export default function useAddPurchaseOrder({ setSelected, selected }: any) {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');

  const getAssociatesOrderParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      search,
    },
  };
  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetAirServicesAssociatesOrderQuery(getAssociatesOrderParameter, {
      refetchOnMountOrArgChange: true,
    });

  const addOrderColumns = getAddPurchaseOrderColumns({
    setSelected,
    selected,
    associatesOrderList: data?.data?.purchases,
  });

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  return {
    addOrderColumns,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPage,
    setPageLimit,
    handleSearch,
  };
}
