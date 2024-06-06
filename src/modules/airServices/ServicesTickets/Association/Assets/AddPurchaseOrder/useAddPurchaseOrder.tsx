import { useTheme } from '@mui/material';
import { useGetAssociatesOrderQuery } from '@/services/airServices/tickets/single-ticket-details/association';
import { useState } from 'react';
import { PAGINATION } from '@/config';
import { getAddPurchaseOrderColumns } from './AddPurchaseOrder.data';

export default function useAddPurchaseOrder({ setSelected, selected }: any) {
  const theme: any = useTheme();

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
    useGetAssociatesOrderQuery(getAssociatesOrderParameter, {
      refetchOnMountOrArgChange: true,
    });

  const addOrderColumns = getAddPurchaseOrderColumns({
    theme,
    setSelected,
    selected,
    associatesOrderList: data?.data?.inventories,
  });

  return {
    addOrderColumns,
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
