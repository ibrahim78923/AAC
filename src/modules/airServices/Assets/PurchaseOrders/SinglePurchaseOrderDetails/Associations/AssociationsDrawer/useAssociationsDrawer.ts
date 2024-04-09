import { PAGINATION } from '@/config';
import { useLazyGetTicketsQuery } from '@/services/airServices/tickets';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePostAssociationsMutation } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/associations';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useAssociationsDrawer = (props: any) => {
  const { open, setDrawerOpen } = props;
  const searchParams = useSearchParams();
  const purchaseOrderId = searchParams?.get('purchaseOrderId');
  const [selectedTicketList, setSelectedTicketList] = useState<any>([]);

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');

  const [lazyGetTicketsTrigger, lazyGetTicketsStatus] =
    useLazyGetTicketsQuery();
  const [postAssociationTrigger, postAssociationStatus] =
    usePostAssociationsMutation();

  const tickets = lazyGetTicketsStatus?.data?.data;
  const metaData = lazyGetTicketsStatus?.data?.data?.meta;

  const getValueTicketsListData = async () => {
    const getTicketsParam = new URLSearchParams();
    getTicketsParam?.append('ticketType', 'SR');

    getTicketsParam?.append('page', page + '');
    getTicketsParam?.append('limit', pageLimit + '');
    getTicketsParam?.append('search', search);
    const getTicketsParameter = {
      queryParams: getTicketsParam,
    };
    try {
      await lazyGetTicketsTrigger(getTicketsParameter)?.unwrap();
      setSelectedTicketList([]);
    } catch (error: any) {
      setSelectedTicketList([]);
    }
  };

  const onSubmit = async () => {
    const postAssociationParameter = {
      purchaseOrderId,
      body: {
        ticketsIds: selectedTicketList?.map((ticket: any) => ticket?._id),
      },
    };
    try {
      await postAssociationTrigger(postAssociationParameter)?.unwrap();
      successSnackbar('Tickets Associated Successfully!');
      setSelectedTicketList([]);
      setDrawerOpen(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  useEffect(() => {
    getValueTicketsListData();
  }, [search, page, pageLimit]);

  return {
    lazyGetTicketsStatus,
    search,
    setSearch,
    pageLimit,
    setPageLimit,
    page,
    setPage,
    open,
    setDrawerOpen,
    setSelectedTicketList,
    selectedTicketList,
    tickets,
    metaData,
    onSubmit,
    postAssociationStatus,
  };
};
