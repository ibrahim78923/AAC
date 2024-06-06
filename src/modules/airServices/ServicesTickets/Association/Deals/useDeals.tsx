import { useEffect, useState } from 'react';
import { getAssociateDealsColumns } from './Deals.data';
import { drawerInitialState } from '../Association.data';
import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { useLazyGetTicketsAssociatesDealsQuery } from '@/services/airServices/tickets/single-ticket-details/association';
import { buildQueryParams } from '@/utils/api';

export default function useDeals({ setIsDrawerOpen }: any) {
  const router = useRouter();

  const [modalId, setModalId] = useState({
    view: false,
    delete: false,
    id: '',
  });

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [selected, setSelected] = useState([]);

  const { ticketId } = router?.query;

  const associateDealsColumns = getAssociateDealsColumns({ setModalId });

  const [
    lazyGetTicketsAssociatesDealsTrigger,
    { data, isLoading, isFetching, isError, isSuccess },
  ] = useLazyGetTicketsAssociatesDealsQuery<any>();

  const getTicketsAssociatesDealsListData = async (currentPage: any = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['ticketId', ticketId],
    ];

    const getTicketsAssociatesDealsParam: any =
      buildQueryParams(additionalParams);

    const getTicketsAssociatesDealsParameter = {
      queryParams: getTicketsAssociatesDealsParam,
    };

    try {
      await lazyGetTicketsAssociatesDealsTrigger(
        getTicketsAssociatesDealsParameter,
      )?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getTicketsAssociatesDealsListData();
  }, [page, pageLimit]);

  const onClose = () => {
    setIsDrawerOpen(drawerInitialState);
    setSelected([]);
  };

  const submitHandler = () => {};

  return {
    onClose,
    submitHandler,
    selected,
    setSelected,
    associateDealsColumns,
    modalId,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPage,
    setPageLimit,
  };
}
